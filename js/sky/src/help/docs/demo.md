---
name: Help
icon: question
summary: The help service allows Angular components to open and close the help panel programmatically.
---

The help service allows Angular components to open and close the help panel programmatically. When the widget opens, it interrogates the page to identify the current help topic and display relevant help content. The `bbHelpConfig` object controls settings for this service.

 ### Dependencies ###

 - **[easyXDM](http://easyxdm.net/wp/) (2.4.19 or higher)** Used to make cross-domain requests to the help server.

---

### bbHelp Methods ###
- `init()` &mdash; Adds a global help button to the top-right corner of the page. You should supply the appropriate `bbHelpConfig` options before you call `init()`.
- `open()` &mdash; Opens help using the specified help key. If `init()` has not been called yet, then the global add button is added to the page before the help topic opens.
- `close()` &mdash; Closes the current help topic.

### bbHelpConfig Settings ###
- `caseCentral` &mdash; *(Optional.)* Customizes the Case Central URL. To remove the link, set this to an empty string.
- `clientId` &mdash; *(Optional.)* Pass the client/site ID to the chat session.
- `communityUrl` &mdash; *(Optional.)* Displays a link to Community.
- `customLocales` &mdash; *(Optional.)* Specifies an array of locales that the product has help content for in addition to the default help content locale. This array contain strings such as `en-gb` and `fr`.
- `getChatData` &mdash; *(Optional.)* Specifies a function that returns the chat key and website ID to use for the product based on the user's locale. For example:
   ```
   getChatData: function(userLocale) {
            if (locale === 'en-gb') {
                return {
                    key: '3674699029499270000',
                    websiteId: ' 3506212574036402816'
                };
            }
            return {
                key: ' 171147028994005462',
                websiteId: '2766361919244160000'
            };
        }
    ```
- `getCurrentHelpKey` &mdash; Specifies a function that returns the page's current help URL. When users navigate around your app and click the help panel, a call to this function can determine the appropriate help file to display. For example: `function() { return 'myHelpFile.html'}`.
- `helpBaseUrl` &mdash; *(Optional.)* Provides the base URL for your help files. The default base URL inserts the `productId` value into "https://www.blackbaud.com/files/support/helpfiles/{ProductId}/content/". This parameter allows you to override the default when help content must exist at some other path.
- `knowledgebaseUrl` &mdash; *(Optional.)* Customizes the knowledgebase URL. To remove the link, set this to an empty string.
- `onHelpLoaded` &mdash; *(Optional.)* Specifies a function to be called after the help panel loads.
- `productId` &mdash; Specifies the product identifier. This ID is included in the default base URL for the product's help content.
- `url` &mdash; Specifies the URL to the Help Widget to include.
- `userData` &mdash; *(Optional.)* Specifies an object that passes information about the current user to the chat session. For example: `{ emailAddress: '', firstName: '', lastName: ''}`.