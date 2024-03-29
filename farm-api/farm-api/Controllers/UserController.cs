﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Model;
using Repository.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;

namespace farm_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        public IUserInterface repository = new UserRepository();

        [EnableCors()]
        [HttpPost]
        public Object Login([FromBody] Users user)
        {
            if (user.User_Email_Id == "")
            {
                return JsonConvert.SerializeObject(new Result { message="Insert Username" } );
            }
            else
            {
                return repository.Login(user);
            }
        }

        [EnableCors()]
        [HttpGet]
        public Object GetUser(int farmerId, int userId)
        {
            if (userId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Modules Found" });
            }
            else
            {
                return repository.GetUser(farmerId,userId);
            }
            
        }

        [EnableCors()]
        [HttpGet]
        [Route("GetUserType")]
        public Object GetUserType(int userTypeId)
        {
            if (userTypeId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Modules Found" });
            }
            else
            {
                return repository.GetUserType(userTypeId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SaveUser")]
        public Object SaveUser([FromBody] Users user)
        {
            if (user.User_Email_Id == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Email" });
            }
            if (user.User_First_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Firstname" });
            }
            if (user.User_Last_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Lastname" });
            }
            if (user.Password == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Password" });
            }
            if (user.User_Phone == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Phone" });
            }
            else
            {
                return repository.SaveUser(user);
            }
        }

        [EnableCors()]
        [HttpPost]
        [Route("UpdateUser")]
        public Object UpdateUser([FromBody] Users user)
        {
            if (user.User_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid User" });
            }
            if (user.User_Email_Id == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Username" });
            }
            if (user.User_First_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Firstname" });
            }
            if (user.User_Last_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Lastname" });
            }
            if (user.Password == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Password" });
            }
            if (user.User_Phone == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Phone" });
            }
            else
            {
                return repository.UpdateUser(user);
            }
        }
    }
}
