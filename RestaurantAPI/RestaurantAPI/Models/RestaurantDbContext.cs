using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantAPI.Models
{
    public class RestaurantDbContext:DbContext
    {
        public RestaurantDbContext(DbContextOptions<RestaurantDbContext> options):base(options)
        {

        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Nourriture> Nourritures { get; set; }
        public DbSet<CommandeM> CommandeMains { get; set; }
        public DbSet<CommandeDetail> CommandeDetails { get; set; }
    }
}
