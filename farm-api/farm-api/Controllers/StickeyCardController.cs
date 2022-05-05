using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Newtonsoft.Json;
using Repository.StickeyCard;
using System;

namespace farm_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StickeyCardController : ControllerBase
    {
        public IStickeyCardInterface repository = new StickeyCardRepository();

        [EnableCors()]
        [HttpGet]
        public Object GetStickeyCards(int stickeyCardId)
        {
            if (stickeyCardId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No StickeyCard Found" });
            }
            else
            {
                return repository.GetStickeyCardDetail(0);
            }

        }

        [EnableCors()]
        [HttpGet]
        [Route("GetStickeyCardDetail")]
        public Object GetStickeyCardDetail(int stickeyCardId)
        {
            if (stickeyCardId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No StickeyCard Found" });
            }
            else
            {
                return repository.GetStickeyCardDetail(stickeyCardId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SaveStickeyCard")]
        public Object SaveStickeyCard([FromBody] StickeyCard stickeyCard)
        {
            if (stickeyCard.Stickey_Card_color == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Color" });
            }
            if (stickeyCard.Stickey_Card_Image == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Image" });
            }
            else
            {
                return repository.SaveStickeyCard(stickeyCard);
            }
        }

        [EnableCors()]
        [HttpPost]
        [Route("UpdateStickeyCard")]
        public Object UpdateStickeyCard([FromBody] StickeyCard stickeyCard)
        {
            if (stickeyCard.StickeyCard_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid StickeyCard" });
            }
            if (stickeyCard.Stickey_Card_color == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Color" });
            }
            if (stickeyCard.Stickey_Card_Image == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Image" });
            }
            else
            {
                return repository.UpdateStickeyCard(stickeyCard);
            }
        }
    }
}
