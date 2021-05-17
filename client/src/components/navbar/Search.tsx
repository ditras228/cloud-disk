import React from 'react';
import {Dropdown,DropdownButton, FormControl, InputGroup} from "react-bootstrap";

const Search: React.ComponentType<PropsType> = ({value, onChange}) => {
    return (
            <InputGroup>
                <FormControl
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />

                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-secondary"
                    title="Dropdown"
                    id="input-group-dropdown-2"
                >
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Separated link</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
    )
};

export default Search;

type PropsType= {
    value: number,
    onChange: ()=>{}
}