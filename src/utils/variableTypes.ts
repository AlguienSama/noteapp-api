class VarTypes {

    static correctString = (string): string => {
        string = string.to_string();
        string = string.trim();
        return string;
    }

    static correctNum = (num): number => {
        num = parseInt(num);
        return isNaN(num) ? undefined : num;
    }

    static correctBool = (bool): boolean => {
        return typeof bool === "boolean" ? bool : undefined;
    }

    static correctHexColor = (color): string => {
        color = color.trim();
        return /^#[0-9A-F]{6}$/i.test(color) ? color : undefined;
    }

}

export default VarTypes;