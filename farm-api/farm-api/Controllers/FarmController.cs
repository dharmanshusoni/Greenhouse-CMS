using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model;
using Newtonsoft.Json;
using Repository.Farm;
using System;

namespace farm_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FarmController : ControllerBase
    {
        public IFarmInterface repository = new FarmRepository();
        
        [EnableCors()]
        [HttpGet]
        public Object GetFarmsForFarmer(int FarmerId)
        {
            if (FarmerId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Farm Found" });
            }
            else
            {
                return repository.GetFarmsForFarmer(FarmerId);
            }

        }

        [EnableCors()]
        [HttpGet]
        [Route("GetFarmsForFarm")]
        public Object GetFarmsForFarm(int FarmId)
        {
            if (FarmId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Farm Found" });
            }
            else
            {
                return repository.GetFarmDetail(FarmId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SaveFarm")]
        public Object SaveFarm([FromBody] Farm farm)
        {
            if (farm.Farm_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Farmer Name" });
            }
            if (farm.Farm_Address == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Address Line 1" });
            }
            if (farm.Farm_Address_2 == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Address Line 2" });
            }
            if (farm.City == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert City" });
            }
            if (farm.State == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert State" });
            }
            if (farm.Country == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Country" });
            }
            if (farm.PostalCode == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert PostalCode" });
            }
            else
            {
                return repository.SaveFarm(farm);
            }
        }

        [EnableCors()]
        [HttpPost]
        [Route("UpdateFarm")]
        public Object UpdateFarm([FromBody] Farm farm)
        {
            if (farm.Farm_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid Farm" });
            }
            if (farm.Farm_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Farm Name" });
            }
            if (farm.Farm_Address == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Address Line 1" });
            }
            if (farm.Farm_Address_2 == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Address Line 2" });
            }
            if (farm.City == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert City" });
            }
            if (farm.State == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert State" });
            }
            if (farm.Country == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Country" });
            }
            if (farm.PostalCode == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert PostalCode" });
            }
            else
            {
                return repository.UpdateFarm(farm);
            }
        }
    }
}
