---
name: Avatar
icon: user
summary: The avatar component displays an image with an option to let users change the image.
---

The avatar directive displays an image to identify a record.

 The directive also includes an option to let users change the image. To select a different image, users can click the image or drag another image on top of it. In addition, when images are missing, the avatar directive can display the initials of a name that you provide.

 ### Avatar settings
 - `bb-avatar` &mdash; Displays an image to identify a record.
  - `bb-avatar-src` &mdash; Provides a reference to a URL or `File` object that represents the avatar.
  - `bb-avatar-name` &mdash; Specifies the name of the record that the avatar represents. If `bb-avatar-src` does not specify an image, the directive extracts initials from the first and last words of this name and displays them in place of the missing image. To ensure that the directive extracts the correct initials, specify a name with no prefix (e.g. "Dr.", "Mrs.") or suffix (e.g. "Jr.", "Esq."). You can also provide the initials with a space between them (e.g. "R H").
  - `bb-avatar-change` &mdash; Specifying a function for this attribute will allow the user to select a new photo, much like [the `bb-file-drop` directive](../fileattachments). When a user changes an image, the directive calls this function with the `File` object that represents the new image. This file can then be uploaded and the `bb-avatar-src` property updated to show the new image either with the provided `File` or the URL of the uploaded image.


 ### bbAvatarConfig settings ###
 - `maxFileSize` &mdash; The maximum allowed size of a file to be uploaded in bytes.  Default is 500000.

