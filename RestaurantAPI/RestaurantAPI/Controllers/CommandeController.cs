using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantAPI.Models;

namespace RestaurantAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommandeController : ControllerBase
    {
        private readonly RestaurantDbContext _context;

        public CommandeController(RestaurantDbContext context)
        {
            _context = context;
        }

        // GET: api/Commande
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommandeM>>> GetCommandeMains()
        {
            return await _context.CommandeMains.ToListAsync();
        }

        // GET: api/Commande/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommandeM>> GetCommandeM(long id)
        {
            var commandeM = await _context.CommandeMains.FindAsync(id);

            if (commandeM == null)
            {
                return NotFound();
            }

            return commandeM;
        }

        // PUT: api/Commande/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommandeM(long id, CommandeM commandeM)
        {
            if (id != commandeM.CommandeMId)
            {
                return BadRequest();
            }

            _context.Entry(commandeM).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommandeMExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Commande
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CommandeM>> PostCommandeM(CommandeM commandeM)
        {
            _context.CommandeMains.Add(commandeM);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCommandeM", new { id = commandeM.CommandeMId }, commandeM);
        }

        // DELETE: api/Commande/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommandeM(long id)
        {
            var commandeM = await _context.CommandeMains.FindAsync(id);
            if (commandeM == null)
            {
                return NotFound();
            }

            _context.CommandeMains.Remove(commandeM);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommandeMExists(long id)
        {
            return _context.CommandeMains.Any(e => e.CommandeMId == id);
        }
    }
}
