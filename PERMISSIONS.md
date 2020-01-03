# Permissions

A permission define a set of rules the request has to match. Each condition are composed with AND, the request has to fulfill all ot them to match the permission.

* name : The name of the permission (descriptive)
* permission : The id of the permission
* request : The conditions the request has to fulfill
* response : the conditions the response has to fulfill

```
{
    "name": "mytest",
    "permission": "mytest",
    "request": {
        "method": "GET",
        "path": {
            "value": "/v2/types",
            "is_regex": false
        },
        "query": [
            {
                "name": "query",
                "check_value": "no",
                "presence": "mandatory"
            }
        ],
        "headers": [
            {
                "name": "Fiware-Service",
                "check_value": "no",
                "presence": "mandatory"
            }
        ],
        "body": {
            "presence": "optional",
            "id": [
                {
                    "name": "id",
                    "presence": "mandatory",
                    "check_type": "no",
                    "check_value": "equals",
                    "value": "Room2"
                }
            ],
            "attributes": [
                {
                    "name": "temperature",
                    "presence": "optional",
                    "check_type": "no",
                    "check_value": "equals",
                    "value": "my data"
                }
            ]
        }
    }
}
```
## Request Condition
The condition on the request could be on the method, the path, the query string, the headers and the body. If the group is not present, it means there is no condition on it.

### Request : Method
```
"method": "GET"
```

The method value, should match the request method to fulfill this condition

### Request : Path
```
"path": {
    "value": "/v2/types",
    "is_regex": false
}
```

If **is_regex** if *false*, the **value** of the condition should be equals to the path of the request.

If **is_regex** if *true*, the **value** of the condition is a RegExp that should match the path of the request.

### Request : Query

```
"query": [
    {
        "name": "query",
        "check_value": "no",
        "presence": "mandatory"
    }
]
```

**query** is an array of conditions the apply to the request query string

**Mandatory fields**
* **name** : the name of the query parameter
* **check_value** : 
  - **no** : no check on the value, just check is presence
  - **equals** : The attribute **value** have to be equals to the value of the query paramiters.
  - **regex** : The **value** is a regex that should be compare to the query parameter value.
* **presence** : 
  - **optional** : default value, the query param is neither mandatory or forbidden.
  - **manadtory** : the query parameter have to be present
  - **forbidden** : the query parameter is not allowed

### Request :  Headers

```
"headers": [
    {
        "name": "Fiware-Service",
        "check_value": "no",
        "presence": "mandatory"
    }
]
```
**headers** is an array of conditions the apply to the request headers

**Mandatory fields**
* **name** : the name of the header
* **check_value** : 
  - **no** : no check on the value, just check is presence
  - **equals** : The attribute **value** have to be equals to the value of the header.
  - **regex** : The **value** is a regex that should be compare to the header value.
* **presence** : 
  - **optional** : default value, the header is neither mandatory or forbidden.
  - **manadtory** : the header have to be present
  - **forbidden** : the header is not allowed


### Request : Body
```
        "body": {
            "presence": "optional",
            "id": [
                {
                    "name": "id",
                    "presence": "mandatory",
                    "check_type": "no",
                    "check_value": "equals",
                    "value": "Room2"
                }
            ],
            "attributes": [
                {
                    "name": "temperature",
                    "presence": "optional",
                    "check_type": "no",
                    "check_value": "equals",
                    "value": "my data"
                }
            ]
        }
```

**Mandatory fields**
* **presence** : 
  - **optional** : default value, the body is neither mandatory or forbidden.
  - **manadtory** : the body have to be present
  - **forbidden** : the body is not allowed
* **id** : An array of *BodyCondition* that are discrimant for the permission. They are tests first.
* **attributes** : Another array of *BodyCondition* the permission has to fulfill.
