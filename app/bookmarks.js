import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ListView extends Component {
    render() {
        var bks = this.props.bookmarks;
        var items = (bks.map(function (b, i) {
            return (<div key={b.id} key={b.id} className='one'>
                <Bookmark title={b.title} url={b.url} />
            </div>);
        }));
        return (items);
    }
}
class Bookmark extends Component {
    render() {
        return (
            <a href={this.props.url} title={this.props.title}>

                <Favicon url={this.props.url} />
                <p className='text'>{this.props.title}</p>
            </a>
        );
    }
}

class Favicon extends Component {
    render() {
        var url = "https://icon-fetcher-go.herokuapp.com/icon?size=128&url=" + this.props.url;
        return (
            <span>
                <img src={url} id={url} width="128" height="128" className="thumbnail" />
            </span>
        );
    }
}

function getFlatBookmarks(bookmarkTree) {
    var bookmarks = getAllBookmarks(bookmarkTree);
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

function getAllBookmarks(bookmarkTree) {
    var bookmarks = [];
    for (var i = 0; i < bookmarkTree.length; i++) {
        var element = bookmarkTree[i];
        if ((element.url != undefined) && (element.url.startsWith("http"))) {
            bookmarks.push(element);
        }
        else {
            if (element.children != undefined) {
                bookmarks.push(getAllBookmarks(element.children));
            }
        }
    }
    return bookmarks;
}

async function renderBookmarks() {
    const prefs = await browser.storage.local.get();
    var bookmarkTree = await browser.bookmarks.getSubTree(prefs.bookmarkId || "toolbar_____");
    var flattened_bookmarks = getFlatBookmarks(bookmarkTree);
    if (prefs.style != undefined) {
        ReactDOM.render(prefs.style, document.getElementById('style'));
    }
    ReactDOM.render(<ListView bookmarks={flattened_bookmarks} />, document.getElementById('app'));

}
renderBookmarks();