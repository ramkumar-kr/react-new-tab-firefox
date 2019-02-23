import React, { Component } from 'react';

class BookmarkFolder extends Component {
    
    async setBookmark() {
        const selectedOption = document.getElementById("newBookmark").value;
        browser.storage.local.set({"bookmarkId": selectedOption});
        window.location.reload();
    }
    render() {
        var options = [];
        var options = this.props.folders.map((e) => {
            return (
                <option value={e.id}>{e.title}</option>
            );
        });
        return(
            <div>
                <h3>Selected Bookmark Folder </h3> <em>{this.props.bookmark.title}</em>
                <h3> Select a new Bookmark Folder </h3>
                <select id="newBookmark" >
                    {options}
                </select>

                <button onClick={this.setBookmark}>Update</button>
            </div>
        );
    }
}

module.exports = BookmarkFolder;