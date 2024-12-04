import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ options, selected, onSelect, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`dropdown ${isOpen ? "active" : ""}`}>
      <div className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="dropdown-text">{selected || placeholder}</span>
        <i className="bx bx-chevron-down"></i>
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-option"
              onClick={() => handleSelect(option)}
            >
              <span className="dropdown-option-text">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
