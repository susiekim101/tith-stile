const ToggleSelection = (option, setFormValues, id) => {
    setFormValues((prev) => {
        const selected = prev[id] || []; // Access current selection
        const isSelected = selected.includes(option); // If current option is selected or not

        // Already at max selection
        if(!isSelected && selected.length >= 3) {
            return prev;
        }

        // Updated selection values
        const updated = isSelected 
            ? selected.filter((val) => val !== option) 
            : [...selected, option];

        // Return newFormValues object with updated selection values
        const newFormValues = {
            ...prev,
            [id]: updated
        };

        console.log("updated form values: ", newFormValues);
        return newFormValues;
    });
};

export default ToggleSelection;