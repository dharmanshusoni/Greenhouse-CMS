using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model;
using Newtonsoft.Json;
using Repository.Application;
using System;

namespace farm_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ApplicationController : ControllerBase
    {
        public IApplicationInterface repository = new ApplicationRepository();
        
        [EnableCors()]
        [HttpGet]
        public Object GetApplications(int ApplicationId)
        {
            if (ApplicationId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Application Found" });
            }
            else
            {
                return repository.GetApplicationDetail(0);
            }

        }

        [EnableCors()]
        [HttpGet]
        [Route("GetApplicationDetail")]
        public Object GetApplicationDetail(int ApplicationId)
        {
            if (ApplicationId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Application Found" });
            }
            else
            {
                return repository.GetApplicationDetail(ApplicationId);
            }

        }

        [EnableCors()]
        [HttpGet]
        [Route("GetApplicationType")]
        public Object GetApplicationTypes(int ApplicationTypeId)
        {
            if (ApplicationTypeId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Application Found" });
            }
            else
            {
                return repository.GetApplicationType(ApplicationTypeId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SaveApplication")]
        public Object SaveApplication([FromBody] Application application)
        {
            if (application.Application_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Application Name" });
            }
            if (application.Application_type == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Application Type" });
            }
            if (application.Decease_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Decease" });
            }
            if (application.Application_Assigned_To == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Assingn To" });
            }
            if (application.Application_who_Assigned == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid User Found" });
            }
            else
            {
                return repository.SaveApplication(application);
            }
        }

        [EnableCors()]
        [HttpPost]
        [Route("UpdateApplication")]
        public Object UpdateApplication([FromBody] Application application)
        {
            if (application.Application_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid Application" });
            }
            if (application.Application_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Application Name" });
            }
            if (application.Application_type == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Application Type" });
            }
            if (application.Decease_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Decease" });
            }
            if (application.Application_Assigned_To == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Assingn To" });
            }
            if (application.Application_who_Assigned == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid User Found" });
            }
            else
            {
                return repository.UpdateApplication(application);
            }
        }
    }
}
