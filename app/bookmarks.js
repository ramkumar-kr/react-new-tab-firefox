var React = require('react');
var ReactDOM = require('react-dom');

var ListView = React.createClass({
    render: function() {
        var bks = this.props.bookmarks;
        var items = (bks.map(function(b) {
            if(b.url != undefined){
                return (<div className='col-xs-4 col-sm-3 col-md-2 col-lg-2' key={b.title} style={{paddingTop: '1%', paddingBottom: '1%' }}>
                            <Bookmark title={b.title} url={b.url} />
                        </div>);
            }
        }));
    
        return (<div className=''> {items} </div>);
    }
});

var Bookmark = React.createClass({
    render: function () {
        return (
                <a href={this.props.url} className='btn btn-block'>
                    <Favicon url={this.props.url} />
                    <p style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'no-wrap'}}>{this.props.title}</p>
                </a>
        );
    } 
});

var Favicon = React.createClass({
    render: function () {
        var url = "https://icons.better-idea.org/icon?size=64&url=" + this.props.url;
        return (
                <span>
                <img src={url} id={url}  width="128" height="128" className="img-thumbnail"/></span>
            );
    }
});

self.port.emit("get_bookmarks");
self.port.on("bookmarks", function(bookmarks){
  ReactDOM.render(<ListView bookmarks={bookmarks} />, document.getElementById('app'));
});
