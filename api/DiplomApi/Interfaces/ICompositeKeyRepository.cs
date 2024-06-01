namespace DiplomApi.Interfaces;

public interface ICompositeKeyRepository<T> where T : class
{
    IEnumerable<T> GetAll();
    T GetById(int key1, int key2);
    void Insert(T entity);
    void Update(T entity);
    void Delete(int key1, int key2);
}