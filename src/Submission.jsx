import React, {Component} from 'react';

import Markdown from 'react-markdown';
import Time from 'react-time';
import {a} from 'react-router-dom'
import Modal from 'react-modal'

import 'normalize-css'
import 'typeface-source-code-pro'
import 'typeface-source-sans-pro'
import 'codemirror/lib/codemirror.css';
import '@nteract/notebook-preview/styles/main.css';
import '@nteract/notebook-preview/styles/theme-light.css'

import NotebookPreview from '@nteract/notebook-preview';

import FileSaver from 'file-saver'

import {transforms, displayOrder} from '@nteract/transforms-full';

//Icons
import ThumbsUp from 'react-icons/lib/md/thumb-up'
import ThumbsDown from 'react-icons/lib/md/thumb-down'
import GearIcon from 'react-icons/lib/fa/cog'
import DeleteIcon from 'react-icons/lib/md/delete';

// //Components
// import HeadContainer from '../../containers/HeadContainer';
// import CommentsThread from '../comments/CommentsThread'

class Submission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNotebook: true,
            flipper: true,
            deleteModalOpen: false
        }

        console.log('[submission] - props:' , props);

        this.toggleView = this
            .toggleView
            .bind(this);
        this.upvote = this
            .upvote
            .bind(this);
        this.downvote = this
            .downvote
            .bind(this);
        this.onSubmitComment = this
            .onSubmitComment
            .bind(this);
        this.upvoteComment = this
            .upvoteComment
            .bind(this);
        this.downvoteComment = this
            .downvoteComment
            .bind(this);
        this.upvoteReply = this
            .upvoteReply
            .bind(this);
        this.downvoteReply = this
            .downvoteReply
            .bind(this);
        this.download = this
            .download
            .bind(this);
        this.submitReply = this
            .submitReply
            .bind(this);
        this.printProps = this
            .printProps
            .bind(this);
        this.toggleDeleteModal = this
            .toggleDeleteModal
            .bind(this);
        this.deleteSubmission = this
            .deleteSubmission
            .bind(this);
    }

    componentDidMount() {
        this.forceUpdate();
    }

    componentWillReceiveProps(props) {
        if (props.submission.data) {
            document.title = props.submission.data.notebook.title
        }
        this.setState({
            flipper: !this.state.flipper
        })
        this.forceUpdate();
    }

    printProps() {
        console.log('[Submission] - props: ', this.props);
    }

    download() {
        console.log('[Submission] - downloading notebook...');
        var file = new File([JSON.stringify(this.props.submission.data.notebookJSON)], this.props.submission.data.fileName, {type: 'text/plain'});
        FileSaver.saveAs(file)
    }

    upvote() {
        console.log('upvote: ', this.props.submissionID);
        this
            .props
            .actions
            .upvoteSubmission({submissionID: this.props.submissionID});
        //TODO: unfocus button after click
    }

    downvote() {
        console.log('downvote');
        this
            .props
            .actions
            .downvoteSubmission({submissionID: this.props.submissionID});
        //TODO: unfocus button after click
    }

    upvoteComment(commentID) {
        console.log('[Submission] - upvote comment: ', commentID);
        this
            .props
            .actions
            .upvoteComment({commentID, submissionID: this.props.submissionID});
    }

    downvoteComment(commentID) {
        this
            .props
            .actions
            .downvoteComment({commentID, submissionID: this.props.submissionID});
    }
    upvoteReply({replyID, commentID}) {
        console.log('[Submission] - upvote comment: ', commentID);
        this
            .props
            .actions
            .upvoteReply({commentID, replyID, submissionID: this.props.submissionID});
    }

    downvoteReply({replyID, commentID}) {
        this
            .props
            .actions
            .downvoteReply({commentID, replyID, submissionID: this.props.submissionID});
    }

    encounteredURI(uri) {
        console.log('encountered uri in markdown: ', uri);
    }

    onSubmitComment(comment) {
        console.log('[Submission] - submit new comment: ', comment);
        this
            .props
            .actions
            .submitComment(this.props.submissionID, comment);
    }

    submitReply({reply, commentID}) {
        console.log('[Submission] - reply and commentID:', reply, commentID)
        this
            .props
            .actions
            .submitReply({reply, commentID, submissionID: this.props.submissionID})
    }

    toggleView() {
        this.setState({
            showNotebook: !this.state.showNotebook
        });
    }

    toggleDeleteModal() {
        this.setState({
            deleteModalOpen: !this.state.deleteModalOpen
        });
    }

    deleteSubmission() {
        console.log('[Submission] - delete submission clicked');
        alert('This hasn\'t been implemented yet');
        this.toggleDeleteModal();
    }

    render() {
        return (

            <div>
                <div className='row'>
                    <div className='column'>

                        {/* TODO: extract to component? */}
                        <div className='details'>
                            <div className="details-side">
                                <div className="vote">
                                    {/*TODO:Loading spinners?*/}

                                    <a >
                                        <ThumbsUp/>
                                    </a>

                                    <span className='score'>0</span>

                                    <a >
                                        <ThumbsDown/>
                                    </a>
                                </div>

                                {/*TODO: Admin options*/}

                            </div>
                            <div className='details-main'>

                                <div className='details-header'>

                                    <div className='details-title'>

                                        <h1 className='title'>Test</h1>

                                        <ul className='details-options'>
                                            <li>
                                                <a href='/'><GearIcon/></a>
                                            </li>
                                            <li>
                                                <a><DeleteIcon/></a>
                                            </li>
                                        </ul>

                                        <ul className='topics'>

                                            <li>
                                                <a href='/'>Hello World</a>
                                            </li>
                                            <li>
                                                <a href='/'>Tester</a>
                                            </li>

                                        </ul>

                                    </div>

                                    <div className='details-counts'>
                                        <div className='counts'>
                                            <ul>
                                                <li className='views'>
                                                    <div>
                                                        <span className='count'>10</span>
                                                        Views
                                                    </div>

                                                </li>
                                                <li className='comments'>
                                                    <div>
                                                        <span className='count'>20</span>
                                                        Comments
                                                    </div>

                                                </li>
                                                <li className='votes'>
                                                    <div>
                                                        <span className='count'>0 {' '}</span>
                                                        Votes
                                                    </div>

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className='details-body'>
                                    <div className='details-primary'>
                                        <Markdown source='This is the **summary**'/>

                                    </div>
                                    <div className='details-secondary'>
                                        <div className='side'>
                                            <p className='avatar'>
                                                <img src="" alt="logo"/>
                                            </p>
                                        </div>
                                        <div className='main'>
                                            <ul className='specs'>
                                                <li>

                                                    <span>Author: Darth Vader</span>

                                                </li>
                                                <li>
                                                    <span>Co-Authors: None</span>

                                                </li>
                                                <li>
                                                    <span>Language: Python</span>

                                                </li>
                                                <li>
                                                    <span>Published: 10 Mar 2017</span>
                                                </li>
                                                <li>
                                                    <span>Last update: 10 Mar 2017</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='tile'>
                            {this.props.isLoading
                                ? <h3>Loading...</h3>
                                : <div>
                                    {this.state.showNotebook
                                        ? <div>
                                                <div className='tile-header'>
                                                    <h2 className='tile-title'>Notebook</h2>
                                                    <ul className='tile-options'>
                                                        <li>
                                                            <a className='active'>Notebook</a>
                                                        </li>
                                                        <li>
                                                            <a onClick={this.toggleView}>Comments</a>
                                                        </li>
                                                        <li>
                                                            <a className='alt' onClick={this.download}>Download</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* {this.state.notebook.notebookJSON
                                                        ? <NotebookPreview notebook='../../assets/files/UN_demography.ipynb'/>
                                                        : null} */}
                                                <div id='notebook'>
                                                    <NotebookPreview
                                                        notebook={this.props.submission.data.notebookJSON}
                                                        transforms={transforms}
                                                        displayOrder={displayOrder}/>
                                                </div>
                                            </div>
                                        : <div>
                                            <div className='tile-header'>
                                                <h2 className='tile-title'>Comments</h2>
                                                <ul className='tile-options'>
                                                    <li>
                                                        <a onClick={this.toggleView}>Notebook</a>
                                                    </li>
                                                    <li>
                                                        <a className='active'>Comments</a>
                                                    </li>
                                                    <li>
                                                        <a className='alt' onClick={this.download}>Download</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                        </div>}
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Submission;