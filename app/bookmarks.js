var React = require('react');
var ReactDOM = require('react-dom');

var ListView = React.createClass({
    render: function () {
        var bks = this.props.bookmarks;
        var items = (bks.map(function (b, i) {
                       return (<div key={b.id} key={b.title} className='one'>
                <Bookmark title={b.title} url={b.url} />
            </div>);
        }));

        return (<div className='grid'> {items} </div>);
    }
});

var Bookmark = React.createClass({
    render: function () {
        return (
            <a href={this.props.url}>
                
                <Favicon url={this.props.url} />
                <p className='text'>{this.props.title}</p>
            </a>
        );
    }
});

var Favicon = React.createClass({
    render: function () {
        var url = "https://icon-fetcher-go.herokuapp.com/icon?size=64&url=" + this.props.url;
        return (
            <span>
                <img src={url} id={url} width="128" height="128" className="thumbnail" />
			</span>
		);
	}
});

var getSubTree = browser.bookmarks.getSubTree("toolbar_____");

getSubTree.then(function (bookmarkTree) {
    var flattened_bookmarks = getFlatBookmarks(bookmarkTree);
    ReactDOM.render(<ListView bookmarks={flattened_bookmarks} />, document.getElementById('app'));
});

function getFlatBookmarks(bookmarkTree) {
    var bookmarks = getAllBookmarks(bookmarkTree);
    var flattened_bookmarks = flatten(bookmarks);
    return flattened_bookmarks;
}

function flatten(ary) {
    var ret = [];
    for(var i = 0; i < ary.length; i++) {
        if(Array.isArray(ary[i])) {
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
            if(element.children != undefined){
                bookmarks.push(getAllBookmarks(element.children));
            }
        }
    }
    return bookmarks;
}
