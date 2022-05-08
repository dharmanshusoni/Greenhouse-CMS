using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Crop
{
    public interface ICropInterface
    {
        Object SaveCrop(Model.Crop crop);
        Object UpdateCrop(Model.Crop crop);
        Object GetCropDetail(int CropId);
    }
}
