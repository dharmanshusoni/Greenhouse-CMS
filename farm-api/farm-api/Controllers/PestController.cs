using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model;
using Newtonsoft.Json;
using Repository.Pest;
using System;

namespace farm_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PestController : ControllerBase
    {
        public IPestInterface repository = new PestRepository();
        
        [EnableCors()]
        [HttpGet]
        public Object GetPests(int PestId)
        {
            if (PestId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Pest Found" });
            }
            else
            {
                return repository.GetPestDetail(0);
            }

        }

        [EnableCors()]
        [HttpGet]
        [Route("GetPestDetail")]
        public Object GetPestDetail(int PestId)
        {
            if (PestId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Pest Found" });
            }
            else
            {
                return repository.GetPestDetail(PestId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SavePest")]
        public Object SavePest([FromBody] Pest pest)
        {
            if (pest.Pest_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Pest Name" });
            }
            if (pest.Pest_Details == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Pest Details" });
            }
            if (pest.Pest_Image == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Image" });
            }
            else
            {
                return repository.SavePest(pest);
            }
        }

        [EnableCors()]
        [HttpPost]
        [Route("UpdatePest")]
        public Object UpdatePest([FromBody] Pest pest)
        {
            if (pest.Pest_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid Pest" });
            }
            if (pest.Pest_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Pest Name" });
            }
            if (pest.Pest_Details == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Pest Details" });
            }
            if (pest.Pest_Image == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Image" });
            }
            else
            {
                return repository.UpdatePest(pest);
            }
        }
    }
}
