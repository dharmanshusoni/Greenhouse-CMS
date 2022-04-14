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
using Repository.Module;

namespace farm_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ModulesController : ControllerBase
    {
        public IModuleInterface repository = new ModuleRepository();

        [EnableCors()]
        [HttpGet]
        public Object GetModules(int userId)
        {
            if (userId<0)
            {
                return JsonConvert.SerializeObject(new Result { message="No Modules Founf" } );
            }
            else
            {
                return repository.GetModules(userId);
            }
        }
    }
}
