FORMAT: 1A
HOST: https://api.example.com

# Pure 持续集成平台 API

本套平台的接口全面采用`RESTful`规范

::: note
## Extensions
Some non-standard Markdown extensions are also supported, such as this informational container, which can also contain **formatting**. Features include:

* Informational block fenced with `::: note` and `:::`
* Warning block fenced with `::: warning` and `:::`
* [x] GitHub-style checkboxes using `[x]` and `[ ]`
* Emoji support :smile: :ship: :cake: using `:smile:` ([cheat sheet](http://www.emoji-cheat-sheet.com/))

These extensions may change in the future as the [CommonMark specification](http://spec.commonmark.org/) defines a [standard extension syntax](https://github.com/jgm/CommonMark/wiki/Proposed-Extensions).
:::

# Data Structures

## NoteData
+ id: 1 (required, number) - Unique identifier
+ title: Grocery list (required) - Single line description
+ body: Buy milk - Full description of the note which supports Markdown.

## NoteList (array)
+ (NoteData)

# Group 持续集成

持续集成是整个平台的核心逻辑

## 项目 [/project]

:yum:用户在平台创建一个项目，此项目会关联一个`Git`仓库，所有持续集成的活动都隶属于某一个项目。


### 获取所有项目 [GET]

+ Response 200 (application/json)
    + Body

            {
                "code":"200",
                "data":[
                    "id":"SJjotZ6Te",
                    "name":"我的持续集成项目名称",
                    "repository_url":"https://coding.net/u/luckyjing/p/pure-ci",
                    "repository_name":"pure-ci",
                    "workflow":"yaml file"
                ]
            }

### 创建新项目 [POST]

创建一项新项目，创建的内容存放到`body`里

+ Request 携带body (application/json)

    + Body

            {
                "name": "项目名",
                "repository_url": "关联的仓库URL",
                "repository_name":"仓库名称"
            }

+ Response 201 (application/json)
    + Body  

            {
                "code":200
            }

+ Response 400 (application/json)
    + Body

            {
                "code": "MISSING_PARAM"
            }




## Note [/notes/{id}{?body}]
Note description

+ Parameters

    + id: `68a5sdf67` (required, string) - The note ID

### Get Note [GET]
Get a single note.

+ Parameters

    + body: `false` (boolean) - Set to `false` to exclude note body content.

+ Response 200 (application/json)

    + Headers

            X-Request-ID: f72fc914
            X-Response-Time: 4ms

    + Attributes (NoteData)

+ Response 404 (application/json)

    + Headers

            X-Request-ID: f72fc914
            X-Response-Time: 4ms

    + Body

            {
                "error": "Note not found"
            }

### Update a Note [PUT]
Update a single note by setting the title and/or body.

::: warning
#### <i class="fa fa-warning"></i> Caution
If the value for `title` or `body` is `null` or `undefined`, then the corresponding value is not modified on the server. However, if you send an empty string instead then it will **permanently overwrite** the original value.
:::

+ Request (application/json)

    + Body

            {
                "title": "Grocery List (Safeway)"
            }

+ Response 200 (application/json)

    + Headers

            X-Request-ID: f72fc914
            X-Response-Time: 4ms

    + Attributes (NoteData)

+ Response 404 (application/json)

    + Headers

            X-Request-ID: f72fc914
            X-Response-Time: 4ms

    + Body

            {
                "error": "Note not found"
            }

+ Request delete body (application/json)

    + Body

            {
                "body": ""
            }

+ Response 200 (application/json)

    + Headers

            X-Request-ID: f72fc914
            X-Response-Time: 4ms

    + Attributes (NoteData)

+ Response 404 (application/json)

    + Headers

            X-Request-ID: f72fc914
            X-Response-Time: 4ms

    + Body

            {
                "error": "Note not found"
            }

### Delete a Note [DELETE]
Delete a single note

+ Response 204

+ Response 404 (application/json)

    + Headers

            X-Request-ID: f72fc914
            X-Response-Time: 4ms

    + Body

            {
                "error": "Note not found"
            }

# Group Users
Group description

## User List [/users{?name,joinedBefore,joinedAfter,sort,limit}]
A list of users

+ Parameters

    + name: `alice` (string, optional) - Search for a user by name
    + joinedBefore: `2011-01-01` (string, optional) - Search by join date
    + joinedAfter: `2011-01-01` (string, optional, ) - Search by join date
    + sort: `joined` (string, optional) - Which field to sort by
        + Default: `name`
        + Members
            + `name`
            + `joined`
            + `-joined`
            + `age`
            + `-age`
            + `location`
            + `-location`
            + `plan`
            + `-plan`
    + limit: `25` (integer, optional) - The maximum number of users to return, up to `50`
      + Default: `10`

### Get users [GET]
Get a list of users. Example:

```no-highlight
https://api.mywebsite.com/users?sort=joined&limit=5
```

+ Response 200 (application/json)

    + Body

            [
                {
                    "name": "alice",
                    "image": "http://example.com/alice.jpg",
                    "joined": "2013-11-01"
                },
                {
                    "name": "bob",
                    "image": "http://example.com/bob.jpg",
                    "joined": "2013-11-02"
                }
            ]



# Group Tags and Tagging Long Title
Get or set tags on notes

## GET /tags
Get a list of bars

+ Response 200 (application/json)

        ["tag1", "tag2", "tag3"]

## Get one tag [/tags/{id}]
Get a single tag

+ Parameters
    + id - Unique tag identifier

### GET

+ Response 200