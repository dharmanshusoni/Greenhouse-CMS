using Microsoft.AspNetCore.Mvc;
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
        public Object Login([FromBody]User user)
        {
            if (user.Username == "")
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
        public Object GetProfile(int userId)
        {
            if (userId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Modules Found" });
            }
            else
            {
                return repository.GetProfile(userId);
            }
            
        }

        [EnableCors()]
        [HttpPost]
        [Route("SaveProfile")]
        public Object SaveProfile([FromBody] User user)
        {
            if (user.Username == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Username" });
            }
            if (user.FirstName == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Firstname" });
            }
            if (user.LastName == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Lastname" });
            }
            if (user.Password == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Password" });
            }
            else
            {
                return repository.SaveProfile(user);
            }
        }

        [EnableCors()]
        [HttpPost]
        [Route("UpdateProfile")]
        public Object UpdateProfile([FromBody] User user)
        {
            if (user.id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid User" });
            }
            if (user.Username == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Username" });
            }
            if (user.FirstName == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Firstname" });
            }
            if (user.LastName == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Lastname" });
            }
            if (user.Password == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Password" });
            }
            else
            {
                return repository.UpdateProfile(user);
            }
        }
    }
}
