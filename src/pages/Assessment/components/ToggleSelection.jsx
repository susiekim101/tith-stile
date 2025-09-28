const ToggleSelection = (select, option, setFormValues, id) => {

    setFormValues((prev) => {
        const selected = prev[id] || []; // Access current selection
        const isSelected = selected.includes(option); // If current option is selected or not
        let newFormValues;
        // Already at max selection
        if(!isSelected && selected.length >= select) {
            return prev;
        }

        // Updated selection values
        const updated = isSelected 
            ? selected.filter((val) => val !== option) 
            : [...selected, option];

        // Return newFormValues object with updated selection values
        if(updated.length == 0) {
            const { [id]: _, ...rest} = prev;
            newFormValues = rest;
        } else {
            newFormValues = {
                ...prev,
                [id]: updated
            };
        }

        // console.log("updated form values: ", newFormValues);
        return newFormValues;
    });
};

export default ToggleSelection;