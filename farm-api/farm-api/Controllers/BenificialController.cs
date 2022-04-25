using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model;
using Newtonsoft.Json;
using Repository.Benificial;
using System;

namespace farm_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class BenificialController : ControllerBase
    {
        public IBenificialInterface repository = new BenificialRepository();
        
        [EnableCors()]
        [HttpGet]
        public Object GetBenificials(int BenificialsId)
        {
            if (BenificialsId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Benificial Found" });
            }
            else
            {
                return repository.GetBenificialDetail(0);
            }

        }

        [EnableCors()]
        [HttpGet]
        [Route("GetBenificialDetail")]
        public Object GetBenificialDetail(int BenificialsId)
        {
            if (BenificialsId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Benificial Found" });
            }
            else
            {
                return repository.GetBenificialDetail(BenificialsId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SaveBenificial")]
        public Object SaveBenificial([FromBody] Benificials benificials)
        {
            if (benificials.Benificial_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Benificial Name" });
            }
            if (benificials.Benificial_Description == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Benificial Details" });
            }
            if (benificials.Benificial_Image == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Image" });
            }
            else
            {
                return repository.SaveBenificial(benificials);
            }
        }
        
        [EnableCors()]
        [HttpPost]
        [Route("UpdateBenificial")]
        public Object UpdateBenificial([FromBody] Benificials benificials)
        {
            if (benificials.Benificials_ID == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid Benificial" });
            }
            if (benificials.Benificial_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Benificial Name" });
            }
            if (benificials.Benificial_Description == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Benificial Details" });
            }
            if (benificials.Benificial_Image == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Image" });
            }
            else
            {
                return repository.UpdateBenificial(benificials);
            }
        }
    }
}
