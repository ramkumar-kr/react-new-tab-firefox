import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ListBookmarks extends Component {
    render() {
        var bks = this.props.bookmarks
        var items = (bks.map(function (b, i) {
            return (<div key={b.id} key={b.id} className='one'>
                <Bookmark title={b.title} url={b.url} faviconURL={b.faviconURL}/>
            </div>);
        }));
        return (items);
    }
}

class OnlyBookmarks extends Component {
    render() {
        return (
            <div>
                <div id="header">
                    <a href="options.html" class="customize" id="customizeLink">Customize this page</a>
                </div>
                <div class="grid container">
                    <ListBookmarks bookmarks={this.props.bookmarks}/>
                </div>
            </div>
        );
    }
}

class ListView extends Component {
    constructor(props) {
        super(props)
        this.state = { bookmarkTree: props.bookmarkTree }
        this.getSingleLevelItems = this.getSingleLevelItems.bind(this);
        this.updateTree = this.updateTree.bind(this);
        
    }
    // state = { showModal: false}
    updateTree(value){
        this.setState({bookmarkTree: value})
    }

    getSingleLevelItems(bookmarkTree, faviconServerURL) {
        var bookmarks = [];
        var folders = [];
        for (var i = 0; i < bookmarkTree.length; i++) {
            var element = bookmarkTree[i];
            if ((element.url != undefined) && (element.url.startsWith("http"))) {
                element.faviconURL = faviconServerURL + "/icon?size=128&url=" + element.url;
                bookmarks.push(element);
            }
            else {
                if (element.children != undefined) {
                    element.faviconURL = browser.runtime.getURL("/images/folder.png")
                    folders.push(element);
                }
            }
        }
        return {bookmarks: bookmarks, folders: folders};
    }

    render() {
        const items = this.getSingleLevelItems(this.state.bookmarkTree, this.props.faviconServerURL);
        const showResetLink = !(this.state.bookmarkTree == this.props.bookmarkTree);
        var header = <div id="header">
            <a href="options.html" class="customize" id="customizeLink">Customize this page</a>
        </div>
        if(showResetLink) {
            header = header = <div id="header2">
            <a href="" class="reset" id="resetLink">Go back to main folder</a>
            <a href="options.html" class="customize" id="customizeLink">Customize this page</a>
        </div>;
        }
        return (
            <div>
                {header}
                <div class="grid container">
                    <ListFolders folders = {items.folders} onClick={this.updateTree}/>
                    <ListBookmarks bookmarks={items.bookmarks}/>
                </div>
            </div>
        );
    }
}

class ListFolders extends Component {
    render() {
        var fldrs = this.props.folders;
        var onClick = this.props.onClick;
        var items = (fldrs.map(function (b, i) {
            return (<div key={b.id} key={b.id} className='one'>
                <Folder id={b.id} title={b.title} children={b.children} onClick={onClick} faviconURL={b.faviconURL}/>
            </div>);
        }));
        return (items);
    }
}

class Bookmark extends Component {
    render() {
        return (
            <a href={this.props.url} title={this.props.title}>

                <Favicon url={this.props.url} faviconURL={this.props.faviconURL}/>
                <p className='text center'>{this.props.title}</p>
            </a>
        );
    }
}

class Folder extends Component {
    render() {
        return (
            <button class="folder" title={this.props.title} id={this.props.id} onClick={()=>this.props.onClick(this.props.children)}>
                <Favicon faviconURL={this.props.faviconURL}/>
                <p className='text center'>{this.props.title}</p>
            </button>
        )
    }
}

class Favicon extends Component {
    render() {
        var url = this.props.faviconURL;
        return (
            <span>
                <img src={url} id={url} width="128" height="128" className="thumbnail" />
            </span>
        );
    }
}

function getFlatBookmarks(bookmarkTree, faviconServerURL) {
    var bookmarks = getAllBookmarks(bookmarkTree, faviconServerURL);
    var flattened_bookmarks = flatten(bookmarks);
    return flattened_bookmarks;
}

function flatten(ary) {
    var ret = [];
    for (var i = 0; i < ary.length; i++) {
        if (Array.isArray(ary[i])) {
            ret = ret.concat(flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}

function getAllBookmarks(bookmarkTree, faviconServerURL) {
    var bookmarks = [];
    for (var i = 0; i < bookmarkTree.length; i++) {
        var element = bookmarkTree[i];
        if ((element.url != undefined) && (element.url.startsWith("http"))) {
            element.faviconURL = faviconServerURL + "/icon?size=128&url=" + element.url;
            bookmarks.push(element);
        }
        else {
            if (element.children != undefined) {
                bookmarks.push(getAllBookmarks(element.children, faviconServerURL));
            }
        }
    }
    return bookmarks;
}

async function renderBookmarks() {
    const prefs = await browser.storage.local.get();
    var faviconServerURL = prefs.faviconServerURL;
    var bookmarkTree = await browser.bookmarks.getSubTree(prefs.bookmarkId || "toolbar_____");
    if (faviconServerURL === undefined) {
        faviconServerURL = "https://icon-fetcher-go.herokuapp.com"
    }
    if(prefs.NestedView && prefs.NestedView === "true") {
        // var items = getSingleLevelItems(bookmarkTree[0].children, faviconServerURL)
        if (prefs.style != undefined) {
            ReactDOM.render(prefs.style, document.getElementById('style'));
        }
        ReactDOM.render(<ListView bookmarkTree={bookmarkTree[0].children} faviconServerURL={faviconServerURL} />, document.getElementById('app'));
    }
    else {
        var flattened_bookmarks = getFlatBookmarks(bookmarkTree, faviconServerURL);
        if (prefs.style != undefined) {
            ReactDOM.render(prefs.style, document.getElementById('style'));
        }
        ReactDOM.render(<OnlyBookmarks bookmarks={flattened_bookmarks} />, document.getElementById('app'));
    
    }

}
renderBookmarks();