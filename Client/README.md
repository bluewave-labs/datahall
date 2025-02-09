<h1 align="center"><a href="https://bluewavelabs.ca" target="_blank">Datahall</a></h1>

<p align="center"><strong>An open source DocSend alternative</strong></p>

Datahall is an open source DocSend alternative where you can share your files privately with anyone outside of your organization. 

Currently, Datahall is in development. The current designs and the style guide can be viewed [here](https://www.figma.com/design/GLFfhwOQeHmbcflgCTuMKA/File-Server?node-id=0-1&t=be2sQyhaO4ylDg6z-1). 

![Github social](https://github.com/user-attachments/assets/061eaa7d-0d56-4a32-8553-bbfb7fd9e0e3)

## Features & roadmap

* Uploading and editing files
* Sharing and link control
* Tracking and analytics
* Document viewer
* Company branding

## Tech stack

* [ReactJs](https://react.dev/)
* [MUI (React framework)](https://mui.com/)
* [Next.js](https://nextjs.org/)
* [Node.js](https://nodejs.org/en)
* [MongoDB](https://mongodb.com)

## Database


##### Data Types

<details>
<summary><code>User</code></summary>

| **Name**       | **Type**  | **Notes**                                                   |
| -------------- | --------- | ----------------------------------------------------------- |
| `userId`       | `string`  | **Primary Key**. Unique ID for each user                    |
| `firstName`    | `string`  | First name                                                  |
| `lastName`     | `string`  | Last name                                                   |
| `email`        | `string`  | **Unique**. User's email                                    |
| `profilePicUrl`| `string`  | URL to User's picture                                       |
| `isActive`     | `boolean` | Default: `true`                                             |
| `isVerified`   | `boolean` | Default: `false`                                            |
| `lastLogin`    | `Date`    | Timestamp of the last login                                 |
| `createdAt`    | `Date`    | **Not Null**. Timestamp when the user was created           |
| `updatedAt`    | `Date`    | **Not Null**. Timestamp when the user was last updated      |

</details>

<details>
<summary><code>Documents</code></summary>

| **Name**          | **Type**  | **Notes**                                                   |
| ----------------- | --------- | ----------------------------------------------------------- |
| `fileId`          | `string`  | **Primary Key**. Unique ID identifying the file             |
| `parentFileId`    | `string`  | **Foreign Key**. References `Documents.fileId`              |
| `fileName`        | `string`  | Name of the file                                            |
| `type`            | `string`  | File type / extension                                       |
| `fileDirectory`   | `string`  | Directory where the file is located                         |
| `fileSize`        | `int`     | Size of the file in bytes                                   |
| `mimeType`        | `string`  | MIME type of the file                                       |
| `createdBy`       | `string`  | **Foreign Key**. References `User.userId`                   |
| `createdAt`       | `Date`    | **Not Null**. Creation time                                 |
| `updatedAt`       | `Date`    | **Not Null**. Last update time                              |
| `updatedBy`       | `string`  | **Foreign Key**. References `User.userId`                   |
| `totalViews`      | `int`     | Total number of times the file was viewed                   |
| `uniqueViews`     | `int`     | Number of unique viewers of the file                        |

</details>

<details>
<summary><code>Links</code></summary>

| **Name**          | **Type**  | **Notes**                                                           |
| ----------------- | --------- | ------------------------------------------------------------------- |
| `linkId`          | `string`  | **Primary Key**. Unique ID for the link                             |
| `fileId`          | `string`  | **Foreign Key**. References `Documents.fileId`                      |
| `linkName`        | `string`  | Name of the link                                                    |
| `linkUrl`         | `string`  | URL of the link                                                     |
| `isPublic`        | `boolean` | Indicates if the link is public                                     |
| `emailRequired`   | `boolean` | Indicates if an email is required for download                      |
| `passwordRequired`| `boolean` | Indicates if a password is required to view and download the file   |
| `linkPassword`    | `string`  | Password reqired to view and download the file                      |
| `linkUrl`         | `string`  | URL of the link                                                     |
| `canExpire`       | `boolean` | Indicates if the link can expire                                    |
| `expirationTime`  | `Date`    | Expiration date of the link (nullable)                              |
| `updatedAt`       | `Date`    | **Not Null**. Last update time                                      |
| `createdAt`       | `Date`    | **Not Null**. Creation time                                         |
| `createdBy`       | `string`  | **Foreign Key**. References `User.userId`                           |

</details>

<details>
<summary><code>Datahall</code></summary>

| **Name**          | **Type**  | **Notes**                                                   |
| ----------------- | --------- | ----------------------------------------------------------- |
| `folderId`        | `string`  | **Primary Key**. Unique ID for the folder                   |
| `folderName`      | `string`  | Name of the folder                                          |
| `folderLocation`  | `string`  | Location of the folder                                      |
| `updatedAt`       | `Date`    | **Not Null**. Last update time                              |
| `updatedBy`       | `string`  | **Foreign Key**. References `User.userId`                   |
| `createdAt`       | `Date`    | **Not Null**. Creation time                                 |
| `createdBy`       | `string`  | **Foreign Key**. References `User.userId`                   |

</details>

<details>
<summary><code>AccessLogs</code></summary>

| **Name**          | **Type**  | **Notes**                                                   |
| ----------------- | --------- | ----------------------------------------------------------- |
| `logId`           | `string`  | **Primary Key**. Unique ID for each access log              |
| `linkId`          | `string`  | **Foreign Key**. ID of the link accessed                    |
| `userId`          | `string`  | **Foreign Key**. ID of the user who accessed the link       |
| `accessTime`      | `Date`    | **Not Null**. Timestamp when the link was accessed          |
| `ipAddress`       | `string`  | IP address of the user who accessed the link                |

</details>

## Endpoints

### Auth

<details>
<summary id='#get-all-users-id'><code>GET</code> <b>/api/v1/auth/users</b></summary>

###### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | GET              |
> | content-type   | application/json |

###### Response Payload

> | Type          | Notes                                 |
> | ------------- | ------------------------------------- |
> | `Array<User>` | Returns an array containing all users |

</details>

<details>
<summary id='post-register'><code>POST</code> <b>/api/v1/auth/register</b></summary>

##### Method/Headers

> | Method/Headers | Value               |
> | -------------- | ------------------- |
> | Method         | POST                |
> | content-type   | multipart/form-data |

##### Form

> | Name      | Type            | Notes                                           |
> | --------- | --------------- | ----------------------------------------------- |
> | firstName | `string`        |                                                 |
> | lastName  | `string`        |                                                 |
> | email     | `string`        | Valid email address                             |
> | password  | `string`        | Min 8 chars, One Upper, one number, one special |
> | role      | `Array<string>` | Array of user roles                             |

##### Response Payload

> | Type | Notes          |
> | ---- | -------------- |
> | User | User data      |
> | JWT  | JSON web token |

</details>

<details>
<summary id='post-login'><code>POST</code> <b>/api/v1/auth/login</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | POST             |
> | content-type   | application/json |

##### Body

> | Name     | Type     | Notes               |
> | -------- | -------- | ------------------- |
> | email    | `string` | Valid email address |
> | password | `string` |                     |

##### Response Payload

> | Type | Notes          |
> | ---- | -------------- |
> | User | User data      |
> | JWT  | JSON web token |

</details>

<details>
<summary id='post-auth-user-edit-id'><code>POST</code> <b>/api/v1/auth/user/{userId}</b></summary>

###### Method/Headers

> | Method/Headers | Value               |
> | -------------- | ------------------- |
> | Method         | POST                |
> | content-type   | multipart/form-data |

##### Form

> | Name        | Type     | Notes                       |
> | ----------- | -------- | --------------------------- |
> | firstName   | `string` | Optional                    |
> | lastName    | `string` | Optional                    |
> | profileIame | `file`   | Optional                    |
> | password    | `string` | Required to change password |
> | newPassword | `string` | Required to change password |

###### Response Payload

> | Type   | Notes                    |
> | ------ | ------------------------ |
> | `User` | Returns the updated user |

</details>

<details>
<summary id='post-auth-recovery-request-id'><code>POST</code> <b>/api/v1/auth/recovery/request</b></summary>

###### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | POST             |
> | content-type   | application/json |

##### Body

> | Name  | Type     | Notes        |
> | ----- | -------- | ------------ |
> | email | `string` | User's email |

###### Response Payload

> | Type            | Notes                                   |
> | --------------- | --------------------------------------- |
> | `RecoveryToken` | Returns a recovery token if email found |

</details>

<details>
<summary id='post-auth-recovery-validate-id'><code>POST</code> <b>/api/v1/auth/recovery/validate</b></summary>

###### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | POST             |
> | content-type   | application/json |

##### Body

> | Name          | Type     | Notes                               |
> | ------------- | -------- | ----------------------------------- |
> | recoveryToken | `string` | Token issued in `/recovery/request` |

###### Response Payload

> | Type            | Notes                      |
> | --------------- | -------------------------- |
> | `RecoveryToken` | Returns the recovery token |

</details>

<details>
<summary id='post-auth-recovery-reset-id'><code>POST</code> <b>/api/v1/auth/recovery/reset</b></summary>

###### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | POST             |
> | content-type   | application/json |

##### Body

> | Name          | Type     | Notes                                         |
> | ------------- | -------- | --------------------------------------------- |
> | recoveryToken | `string` | Token issued returned by `/recovery/validate` |
> | password      | `string` | User's new password`                          |

###### Response Payload

> | Type   | Notes                    |
> | ------ | ------------------------ |
> | `User` | Returns the updated user |

</details>

---

### Documents

<details>
<summary id='get-documents'><code>GET</code> <b>/api/v1/documents</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | GET              |
> | content-type   | application/json |

##### Response Payload

> | Type               | Notes                                     |
> | ------------------ | ----------------------------------------- |
> | `Array<Document>`  | Array of all latest versions of documents |

</details>

<details>
<summary id='get-documents'><code>GET</code> <b>/api/v1/documents/versions/{documentId}</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | GET              |
> | content-type   | application/json |

##### Response Payload

> | Type               | Notes                                                   |
> | ------------------ | ------------------------------------------------------- |
> | `Array<Document>`  | Array of all documents versions for the parent document |

</details>

<details>
<summary id='get-document'><code>GET</code> <b>/api/v1/document/{documentId}</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | GET              |
> | content-type   | application/json |

##### Response Payload

> | Type               | Notes                                                               |
> | ------------------ | ------------------------------------------------------------------- |
> | `Document`         | Document with the id in the request parameter                       |

</details>

<details>
<summary id='post-document'><code>POST</code> <b>/api/v1/document</b></summary>

###### Method/Headers

> | Method/Headers | Value               |
> | -------------- | ------------------- |
> | Method         | POST                |
> | content-type   | multipart/form-data |

##### Body
> | Name              | Type      | Notes                                  | Accepted Values                         |
> | ----------------- | --------- | -------------------------------------- | --------------------------------------- |
> | `fileData`        | `string`  | The file to be uploaded                |                                         |
> | `fileName`        | `string`  | Name of the file                       |                                         |
> | `type`            | `string`  | File type / extension                  |                                         |
> | `fileDirectory`   | `string`  | Directory where the file should go     |                                         |
> | `fileSize`        | `int`     | Size of the file in bytes              |                                         |
> | `mimeType`        | `string`  | MIME type of the file                  |                                         |
> | `userId`          | `string`  | UserId of current user                 |                                         |

###### Response Payload

> | Type      | Notes                             |
> | --------- | --------------------------------- |
> | `Document` | Returns newly created `Document` |

</details>

<details>
<summary id='post-document-del-id'><code>POST</code> <b>/api/v1/document/delete/{fileId}</b></summary>

###### Method/Headers

> | Method/Headers | Value               |
> | -------------- | ------------------- |
> | Method         | POST                |
> | content-type   | application/json    |

###### Response Payload

> | Type      | Notes                             |
> | --------- | --------------------------------- |
> | `None`    | No payload returned               |

</details>

<details>
<summary id='post-document-edit-id'><code>POST</code> <b>/api/v1/document/edit/{fileId}</b></summary>

###### Method/Headers

> | Method/Headers | Value               |
> | -------------- | ------------------- |
> | Method         | POST                |
> | content-type   | multipart/form-data |

##### Body
> | Name              | Type      | Notes                                  | Accepted Values                         |
> | ----------------- | --------- | -------------------------------------- | --------------------------------------- |
> | `fileData`        | `string`  | The file to be uploaded                |                                         |
> | `fileName`        | `string`  | Name of the file                       |                                         |
> | `type`            | `string`  | File type / extension                  |                                         |
> | `fileDirectory`   | `string`  | Directory where the file should go     |                                         |
> | `fileSize`        | `int`     | Size of the file in bytes              |                                         |
> | `mimeType`        | `string`  | MIME type of the file                  |                                         |
> | `userId`          | `string`  | UserId of current user                 |                                         |

###### Response Payload

> | Type      | Notes                             |
> | --------- | --------------------------------- |
> | `Document` | Returns updated `Document`       |

</details>

### DataRooms

<details>
<summary id='get-datarooms'><code>GET</code> <b>/api/v1/datarooms</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | GET              |
> | content-type   | application/json |

##### Response Payload

> | Type               | Notes                  |
> | ------------------ | ---------------------- |
> | `Array<DataRoom>`  | Array of all datarooms |

</details>

<details>
<summary id='get-dataroom'><code>GET</code> <b>/api/v1/dataroom/{folderId}</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | GET              |
> | content-type   | application/json |

##### Response Payload

> | Type               | Notes                                                |
> | ------------------ | ---------------------------------------------------- |
> | `DataRoom`         | Single dataroom with the id in the request parameter |

</details>

<details>
<summary id='post-dataroom'><code>POST</code> <b>/api/v1/dataroom</b></summary>

###### Method/Headers

> | Method/Headers | Value               |
> | -------------- | ------------------- |
> | Method         | POST                |
> | content-type   | application/json    |

##### Body
> | Name              | Type      | Notes                       | Accepted Values                         |
> | ----------------- | --------- | --------------------------- | --------------------------------------- |
> | `folderName`      | `string`  | Name of the file            |                                         |
> | `folderLocation`  | `string`  | File type / extension       |                                         |
> | `userId`          | `string`  | UserId of current user      |                                         |

###### Response Payload

> | Type      | Notes                             |
> | --------- | --------------------------------- |
> | `DataRoom` | Returns newly created `DataRoom` |

</details>

<details>
<summary id='post-dataroom-del-id'><code>POST</code> <b>/api/v1/dataroom/delete/{folderId}</b></summary>

###### Method/Headers

> | Method/Headers | Value               |
> | -------------- | ------------------- |
> | Method         | POST                |
> | content-type   | application/json    |

###### Response Payload

> | Type      | Notes                             |
> | --------- | --------------------------------- |
> | `None`    | No payload returned               |

</details>

<details>
<summary id='post-document-edit-id'><code>POST</code> <b>/api/v1/dataroom/edit/{folderId}</b></summary>

###### Method/Headers

> | Method/Headers | Value               |
> | -------------- | ------------------- |
> | Method         | POST                |
> | content-type   | application/json    |

##### Body
> | Name              | Type      | Notes                       | Accepted Values                         |
> | ----------------- | --------- | --------------------------- | --------------------------------------- |
> | `folderName`      | `string`  | Name of the file            |                                         |
> | `folderLocation`  | `string`  | File type / extension       |                                         |
> | `userId`          | `string`  | UserId of current user      |                                         |

###### Response Payload

> | Type      | Notes                             |
> | --------- | --------------------------------- |
> | `DataRoom` | Returns updated  `DataRoom`      |

</details>

### Links

<details>
<summary id='get-links'><code>GET</code> <b>/api/v1/links</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | GET              |
> | content-type   | application/json |

##### Response Payload

> | Type               | Notes                  |
> | ------------------ | ---------------------- |
> | `Array<Links>`     | Array of all links     |

</details>

<details>
<summary id='get-link'><code>GET</code> <b>/api/v1/link/{linkId}</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | GET              |
> | content-type   | application/json |

##### Response Payload

> | Type               | Notes                                                |
> | ------------------ | ---------------------------------------------------- |
> | `Link`             | Singe Link with the id in the request parameter      |

</details>

<details>
<summary id='post-link'><code>POST</code> <b>/api/v1/link</b></summary>

###### Method/Headers

> | Method/Headers | Value               |
> | -------------- | ------------------- |
> | Method         | POST                |
> | content-type   | application/json    |

##### Body
> | Name              | Type      | Notes                                            | Accepted Values                         |
> | ----------------- | --------- | ------------------------------------------------ | --------------------------------------- |
> | `fileId`          | `string`  | The fileId of the file the link is generated for |                                         |
> | `linkName`        | `string`  | Name of the link                                 |                                         |
> | `isPublic`        | `boolean` | Indicates if the link is public                  |                                         |
> | `emailRequired`   | `boolean` | Indicates if email is required to download       |                                         |
> | `passwordRequired`| `boolean` | Indicates if password is required to download    |                                         |
> | `linkPassword`    | `string`  | Password required to download                    |                                         |
> | `canExpire`       | `boolean` | Indicates if the link can expire                 |                                         |
> | `expirationTime`  | `Date`    | Date in which the link expires                   |                                         |

###### Response Payload

> | Type      | Notes                             |
> | --------- | --------------------------------- |
> | `Link`    | Returns newly created `Link`       |

</details>

<details>
<summary id='post-link-del-id'><code>POST</code> <b>/api/v1/link/delete/{linkId}</b></summary>

###### Method/Headers

> | Method/Headers | Value               |
> | -------------- | ------------------- |
> | Method         | POST                |
> | content-type   | application/json    |

###### Response Payload

> | Type      | Notes                             |
> | --------- | --------------------------------- |
> | `None`    | No payload returned               |

</details>

<details>
<summary id='post-link-edit-id'><code>POST</code> <b>/api/v1/link/edit/{linkId}</b></summary>

###### Method/Headers

> | Method/Headers | Value               |
> | -------------- | ------------------- |
> | Method         | POST                |
> | content-type   | application/json    |

##### Body
> | Name              | Type      | Notes                                            | Accepted Values                         |
> | ----------------- | --------- | ------------------------------------------------ | --------------------------------------- |
> | `linkName`        | `string`  | Name of the link                                 |                                         |
> | `isPublic`        | `boolean` | Indicates if the link is public                  |                                         |
> | `emailRequired`   | `boolean` | Indicates if email is required to download       |                                         |
> | `passwordRequired`| `boolean` | Indicates if password is required to download    |                                         |
> | `linkPassword`    | `string`  | Password required to download                    |                                         |
> | `canExpire`       | `boolean` | Indicates if the link can expire                 |                                         |
> | `expirationTime`  | `Date`    | Date in which the link expires                   |                                         |

###### Response Payload

> | Type      | Notes                             |
> | --------- | --------------------------------- |
> | `Link`    | Returns updated `Link`            |

</details>

