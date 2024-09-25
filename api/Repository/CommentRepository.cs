using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

//-----------------
                            // GetAll       
        public async Task<List<Comment>> GetAllAsync()
        {
            return await _context.Comments.ToListAsync();
        }

                            // GetById
        public async Task<Comment?> GetByIdAsync(int id)

        {
            return await _context.Comments.FindAsync(id);
        }

                            // Create
        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

                            // Update
        public async Task<Comment?> UpdateAsync(int Id, Comment commentModel)
        {
            var existingComment = await _context.Comments.FindAsync(Id);

            if (existingComment == null)
            {
                return null;
            }

            existingComment.Title = commentModel.Title;
            existingComment.Content = commentModel.Content;

            await _context.SaveChangesAsync();

            return existingComment;
        }

                            // Delete
        public async Task<Comment?> DeleteAsync(int Id)
        {
            var commentModel = await _context.Comments.FirstOrDefaultAsync(x => x.Id == Id);

            if (commentModel == null)
            {
                return null;
            }

            _context.Comments.Remove(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }
    }
}