/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NewReleaseSongListQueryVariables = {||};
export type NewReleaseSongListQueryResponse = {|
  +newReleaseSongs: ?$ReadOnlyArray<?{|
    +id: ?string,
    +title: ?string,
    +isLiked: ?boolean,
    +source: ?string,
    +image: ?{|
      +low: ?string,
      +mid: ?string,
      +high: ?string,
    |},
    +artist: ?{|
      +firstname: ?string,
      +lastname: ?string,
      +gender: ?string,
      +image: ?{|
        +low: ?string
      |},
    |},
  |}>
|};
export type NewReleaseSongListQuery = {|
  variables: NewReleaseSongListQueryVariables,
  response: NewReleaseSongListQueryResponse,
|};
*/


/*
query NewReleaseSongListQuery {
  newReleaseSongs(pageNumber: 1, pageSize: 4, userId: 1) {
    id
    title
    isLiked
    source
    image {
      low
      mid
      high
      id
    }
    artist {
      firstname
      lastname
      gender
      image {
        low
        id
      }
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "pageNumber",
    "value": 1
  },
  {
    "kind": "Literal",
    "name": "pageSize",
    "value": 4
  },
  {
    "kind": "Literal",
    "name": "userId",
    "value": 1
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isLiked",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "source",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "low",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mid",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "high",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstname",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastname",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gender",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewReleaseSongListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Song",
        "kind": "LinkedField",
        "name": "newReleaseSongs",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "newReleaseSongs(pageNumber:1,pageSize:4,userId:1)"
      }
    ],
    "type": "RootQueryType"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NewReleaseSongListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Song",
        "kind": "LinkedField",
        "name": "newReleaseSongs",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "newReleaseSongs(pageNumber:1,pageSize:4,userId:1)"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "NewReleaseSongListQuery",
    "operationKind": "query",
    "text": "query NewReleaseSongListQuery {\n  newReleaseSongs(pageNumber: 1, pageSize: 4, userId: 1) {\n    id\n    title\n    isLiked\n    source\n    image {\n      low\n      mid\n      high\n      id\n    }\n    artist {\n      firstname\n      lastname\n      gender\n      image {\n        low\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a699be6917ef7deaea56ee45c1f02304';

module.exports = node;
