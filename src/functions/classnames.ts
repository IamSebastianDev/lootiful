export const classnames = (...fragments: string[]) => {
    return fragments.filter((v) => !!v).join(" ");
};
