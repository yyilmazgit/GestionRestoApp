using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantAPI.Models
{
    public class CommandeM
    {
        [Key]
        public long CommandeMId { get; set; }

        [Column(TypeName = "nvarchar(75)")]
        public string CommandeNumber { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public string PaimentM { get; set; }

        public decimal FTotal { get; set; }

        public List<CommandeDetail> CommandeDetails { get; set; }

        [NotMapped]
        public string DeletedOrderItemIds { get; set; }

    }
}
