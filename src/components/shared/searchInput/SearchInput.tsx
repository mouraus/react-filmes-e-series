function SearchInput() {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault}>
        <input type='text' />
      </form>
    </>
  );
}

export default SearchInput;
