using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.FarmLayout
{
    public interface IFarmLayoutInterface
    {
        #region FarmLayout
        Object GetLayout(int farmLayoutId, int farmId);
        Object SaveLayout(Model.FarmLayout layoutData);
        Object UpdateLayout(Model.FarmLayout layoutData);
        Object GetLayoutData(int farmLayoutId);
        #endregion

        #region House
        Object UpdateHouseCrop(Model.House house);
        #endregion

        #region Row
        Object UpdateRowCrop(Model.Row row);
        #endregion

        #region
        Object UpdatePostData(Model.Post post);
        #endregion
    }
}
