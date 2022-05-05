using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.StickeyCard
{
    public interface IStickeyCardInterface
    {
        Object SaveStickeyCard(Model.StickeyCard stickeyCard);
        Object UpdateStickeyCard(Model.StickeyCard stickeyCard);
        Object GetStickeyCardDetail(int stickeyCardId);
    }
}
