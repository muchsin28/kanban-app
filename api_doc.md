# Muchsin Kanban
## API Documentation

by. Syihab Muchsin

<br>



## Table of Contents

<!-- toc -->
==================================================================

[Users](#users)

  * [User Register](#user-register)
  * [User Login](#user-login)

[Tasks](#Tasks)
  * [Add Tasks](#add-Tasks)
  * [Show Tasks](#show-Tasks)
  * [Show Tasks By Id](#show-Tasks-By-id)
  * [Update Tasks](#update-Tasks)
  * [Delete Tasks](#delete-Tasks)


<!-- tocstop -->
==================================================================

## *Users*
----

### Register
----

Method: `POST /register`

Request Body (Required) :
  
    name       = [string]
    email      = [string]
    password   = [string]
    department = [string] , Pick 1 from 5 options : IT Security Dept. | Task Design Dept. | Software Engineer Dept. | R&D Dept. | General Service Dept. |


Success Response :
 
  ```
    
    -- Register Success -- 
    ----------------------------------------------------

        Status : 201 Created
        Body   :

        {
          
          "id"    : [integer],
          "email" : [string]
        
        }

    ----------------------------------------------------
  ```
 
Error Responses :
  ```
   
    --- Invalid Input or  Empty Required Field --
    ----------------------------------------------------

        Status : 400 Bad Request
        Body   :
        
        {
          "message": [ valid input information ] 
        }
        ...
        ...

    ----------------------------------------------------

    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```


### User Login 
----

  
Method: `POST /login`

 Request Body (*required*) :
  
    email    = [string]
    password = [string]
  
  
Success Response :
 
  ```
    
    -- Login Success -- 
    ----------------------------------------------------

        Status : 200 OK

        Body   :

        {
          "access_token": [string],
          "name"        : [string],
          "Department"  : [string]
        }

    ----------------------------------------------------
  ```
 
Error Responses :
  ```
    
    -- Emain not registered -- 
    ----------------------------------------------------

        Status : 404 Not Found
        Body   :
        
        {
          "message": "User not found"
        }

    ----------------------------------------------------

   
    -- Empty Field or Wrong Password--
    ----------------------------------------------------

        Status : 400 Bad Request
        Body   :
        
        {
          "message": "Invalid Email/Password"
        },
        ...

    ----------------------------------------------------

    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```

------------------------------------------------------------------------------------

## *Tasks*

----
### Add Tasks
----
Method: `POST /Tasks`

 Request Headers (*required*) :
  
    access_token
  

Request Body  :
  
    title        = [string]
    description  = [string] | optional
    deadline     = [date]
    category     = [string]

Success Response :
 
  ```
    
    -- Add Task Success -- 
    ----------------------------------------------------

        Status : 201 Created
        Body   :

        {
          "id"          : [integer],
          "title"       : [string],
          "description" : [string],
          "deadline"    : [date],
          "category"    : [string],
          "UserId"      : [integer],
          "DepartmentId": [integer],
          "updatedAt"   : [date],
          "createdAt"   : [date]
        }

    ----------------------------------------------------
  ```
 
Error Responses :
  ```
    
    -- Not login -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "Please login"
        }

    ----------------------------------------------------
   
    -- Empty Required Field --
    ----------------------------------------------------

        Status : 400 Bad Request
        Body   :
        
        {
          "message": [field] "cannot be null"
        }
        ...
        ...

    ----------------------------------------------------

    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```


### Show Tasks
----
Method: `GET /Tasks`


Success Response :
 
  ```
    
    -- Show Task Success -- 
    ----------------------------------------------------

        Status : 200 OK
        Body   :

        [
          {
              "id"          : [integer],
              "title"       : [string],
              "description" : [string],
              "deadline"    : [date],
              "category"    : [string],
              "UserId"      : [integer],
              "createdAt"   : [date],
              "updatedAt"   : [date],
              "DepartmentId": [integer],
              "User"        : { User info [Obj],
                                "Department": {User Department [Obj] }
                              }
          },
          ...
          ...
        ]

    ----------------------------------------------------
  ```
Error Responses :
  ```
    -- Not login -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "Please login"
        }

    ----------------------------------------------------

    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```
### Show Tasks By Id
----
Method: `GET /Tasks/:id`


Success Response :
 
  ```
    
    -- Show Task Success -- 
    ----------------------------------------------------

        Status : 200 OK
        Body   :

        [
          {
              "id"          : [integer],
              "title"       : [string],
              "description" : [string],
              "deadline"    : [date],
              "category"    : [string],
              "UserId"      : [integer],
              "createdAt"   : [date],
              "updatedAt"   : [date],
              "DepartmentId": [integer],
              "User"        : { User info [Obj],
                                "Department": {User Department [Obj] }
                              }
          },
          ...
          ...
        ]

    ----------------------------------------------------
  ```
Error Responses :
  ```
    -- Not login -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "Please login"
        }

    ----------------------------------------------------

    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```

### Update Tasks
----
Method: `PATCH /Tasks/:id`

 Request Headers (*required*) :
  
    access_token

Request Params (*required*)  :
  
    id     = [integer]

Request Body  :
  
    category     = [string]
   

Success Response :
 
  ```
    
    -- Update Task Success -- 
    ----------------------------------------------------

        Status : 200 OK
        Body   :

        {
          "id"          : [integer],
          "title"       : [string],
          "description" : [string],
          "deadline"    : [date],
          "category"    : [string],
          "UserId"      : [integer],
          "createdAt"   : [date],
          "updatedAt"   : [date],
          "DepartmentId": [integer],
        }


    ----------------------------------------------------
  ```
 
Error Responses :
  ```
    
    -- Not login -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "Please login"
        }

    ----------------------------------------------------

    -- Access Other Person Task -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "You are not allowed to do this action"
        }

    ----------------------------------------------------

    -- Invalid id -- 
    ----------------------------------------------------

        Status : 404 Not Found
        Body   :
        
        {
          "message": "Item not found"
        }

    ----------------------------------------------------
   
    -- Empty Required Field --
    ----------------------------------------------------

        Status : 400 Bad Request
        Body   :
        
        {
          "message": "Please choose Category"
        }
     

    ----------------------------------------------------


    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```

### Delete Tasks
----
Method: `DELETE /Tasks/:id`

 Request Headers (*required*) :
  
    access_token

Request Params (*required*)  :
  
    id     = [integer]

Success Response :
 
  ```
    
    -- Update Task Success -- 
    ----------------------------------------------------

        Status : 200 OK
        Body   :

        {
           "message": "Success Deleted",
           "task"   : {
                        "id"          : [integer],
                        "title"       : [string],
                        "description" : [string],
                        "deadline"    : [date],
                        "category"    : [string],
                        "UserId"      : [integer],
                        "createdAt"   : [date],
                        "updatedAt"   : [date],
                        "DepartmentId": [integer],
                      }
        }

    ----------------------------------------------------
  ```
 
Error Responses :
  ```
    
    -- Not login -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "Please login"
        }

    ----------------------------------------------------

    -- Access Other Person Task -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "You are not allowed to do this action"
        }

    ----------------------------------------------------

    -- Invalid id -- 
    ----------------------------------------------------

        Status : 404 Not Found
        Body   :
        
        {
          "message": "Item not found"
        }

    ----------------------------------------------------
   

    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```

----
  End of API Documentation
