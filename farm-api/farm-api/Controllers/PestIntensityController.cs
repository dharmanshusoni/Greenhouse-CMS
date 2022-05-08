using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model;
using Newtonsoft.Json;
using Repository.PestIntensity;
using System;

namespace farm_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PestIntensityController : ControllerBase
    {
        public IPestIntensityInterface repository = new PestIntensityRepository();
        
        [EnableCors()]
        [HttpGet]
        public Object GetPestIntensity(int PestIntensityId)
        {
            if (PestIntensityId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Crop Found" });
            }
            else
            {
                return repository.GetPestIntensityDetail(0);
            }

        }

        [EnableCors()]
        [HttpGet]
        [Route("GetPestIntensityDetail")]
        public Object GetPestIntensityDetail(int PestIntensityId)
        {
            if (PestIntensityId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Crop Found" });
            }
            else
            {
                return repository.GetPestIntensityDetail(PestIntensityId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SavePestIntensity")]
        public Object SavePestIntensity([FromBody] PestIntensity crop)
        {
            if (crop.Crop_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Crop" });
            }
            if (crop.Farmer_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farmer" });
            }
            if (crop.Farm_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farm" });
            }
            if (crop.Pest_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Pest" });
            }
            else
            {
                return repository.SavePestIntensity(crop);
            }
        }

        [EnableCors()]
        [HttpPost]
        [Route("UpdatePestIntensity")]
        public Object UpdatePestIntensity([FromBody] PestIntensity crop)
        {
            if (crop.Crops_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid Crop" });
            }
            if (crop.Crop_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Crop" });
            }
            if (crop.Farmer_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farmer" });
            }
            if (crop.Farm_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farm" });
            }
            if (crop.Pest_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Pest" });
            }
            else
            {
                return repository.UpdatePestIntensity(crop);
            }
        }
    }
}
