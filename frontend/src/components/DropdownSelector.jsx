function DropdownSelector({ selected, setSelected, dropdownDatasList, name, disabled }) {
  const handleInputChange = (e) => {
    setSelected(e.target.value);
  };
  return (
    <div>
      <select
        className={`${disabled ? "input-sm-gray-fullfilled" : "input-sm-gray-outlined"}`}
        id={name}
        name={name}
        value={selected}
        onChange={handleInputChange}
        disabled={disabled}
      >
        <option value={""}>--</option>
        {dropdownDatasList.map((el) => (
          <option key={el._id} value={el._id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownSelector;
