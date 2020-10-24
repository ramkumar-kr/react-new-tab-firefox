# React New Tab
New tab extension built using react

## What's new
* **Customization** - It is possible to now add user defined CSS and customize the extension
* **Folder support** - Choose a specific bookmark folder to be shown in the new tab page.


## Steps to build locally
* Use node version v12.16.3 and node version 6.14.4 on ubuntu 18
* Install web-ext (`sudo npm install -g web-ext`)
* Clone the repository (`git clone git@github.com:ramkumar-kr/react-new-tab-firefox.git`)
* Run npm install in the react-new-tab-firefox directory to install all dependencies (`npm install`)
* To test the extension in a temporary firefox profile, use the test script(`npm run test`)
* To create the web-ext artifact for the extension, use the xpi script (`npm run xpi`)

## Known issues
* ~~No support for folders - All bookmarks are shown instead of having a nested structure.~~
* No test cases - Need to write tests
* ~~No customization~~ 
