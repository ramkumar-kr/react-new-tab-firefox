# React New Tab
New tab extension built using react

## Steps to build locally
* Install web-ext (`sudo npm install -g web-ext`)
* Clone the repository (`git clone git@github.com:ramkumar-kr/react-new-tab-firefox.git`)
* Run npm install in the react-new-tab-firefox directory to install all dependencies (`npm install`)
* To test the extension in a temporary firefox profile, use the test script(`npm run test`)
* To create the web-ext artifact for the extension, use the xpi script (`npm run xpi`)

## Known issues
* No support for folders - All bookmarks are shown instead of having a nested structure.
* No test cases - Need to write tests
* No customization 
