namespace Application.Core
{
    // All the parameters that we will use for pagination
    // Users will be allowed to choose the page number and the page size, with a limit of 50
    public class PagingParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}