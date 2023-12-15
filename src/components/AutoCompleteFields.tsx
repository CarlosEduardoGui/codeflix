import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";
import { CastMember } from "../types/CastMembers";
import { Category } from "../types/Category";
import { Genre } from "../types/Genre";

type Props = {
    name: string,
    label: string,
    isLoading: boolean,
    isDisabled: boolean,
    value?: (Category | Genre | CastMember)[],
    options?: (Category | Genre | CastMember)[],
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AutocompleteFields = ({
    name,
    label,
    options,
    value,
    isDisabled,
    isLoading,
    handleChange
}: Props) => {
    const handleRenderOption = (
        props: React.HTMLAttributes<HTMLElement>,
        option: Category | Genre | CastMember
    ) => (
        <li {...props} key={option.id}>
            {option.name}
        </li>
    );

    const isEqualId = (
        option: Genre | Category | CastMember,
        value: Genre | Category | CastMember
    ): boolean => option.id === value.id;

    const handleOnChange = (
        _e: React.ChangeEvent<{}>,
        newValue: (Genre | Category | CastMember)[],
    ) => {
        handleChange({ target: { name, value: newValue } } as any);
    }

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            name={name}
            label={label}
            data-testid={`${name}-input`} />
    );

    return (
        <Autocomplete
            multiple
            value={value}
            options={options || []}
            loading={isLoading}
            onChange={handleOnChange}
            renderInput={renderInput}
            data-testid={`${name}-search`}
            renderOption={handleRenderOption}
            isOptionEqualToValue={isEqualId}
            disabled={isDisabled || !options}
            getOptionLabel={(option) => option.name}
        />
    )
}