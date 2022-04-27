using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Newtonsoft.Json;
using Repository.Decease;
using System;

namespace farm_api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DeceaseController : ControllerBase
    {
        public IDeceaseInterface repository = new DeceaseRepository();

        [EnableCors()]
        [HttpGet]
        public Object GetDeceases(int DeceaseId)
        {
            if (DeceaseId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Decease Found" });
            }
            else
            {
                return repository.GetDeceaseDetail(0);
            }

        }

        [EnableCors()]
        [HttpGet]
        [Route("GetDeceaseDetail")]
        public Object GetDeceaseDetail(int DeceaseId)
        {
            if (DeceaseId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Decease Found" });
            }
            else
            {
                return repository.GetDeceaseDetail(DeceaseId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SaveDecease")]
        public Object SaveDecease([FromBody] Decease decease)
        {
            if (decease.Decease_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Decease Name" });
            }
            if (decease.Crop_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Crop" });
            }
            else
            {
                return repository.SaveDecease(decease);
            }
        }

        [EnableCors()]
        [HttpPost]
        [Route("UpdateDecease")]
        public Object UpdateDecease([FromBody] Decease decease)
        {
            if (decease.Decease_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid Decease" });
            }
            if (decease.Decease_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Decease Name" });
            }
            if (decease.Crop_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Crop" });
            }
            else
            {
                return repository.UpdateDecease(decease);
            }
        }
    }
}
