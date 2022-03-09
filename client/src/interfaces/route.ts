export default interface IRoute {
    auth: any;
    path: string;
    exact: boolean;
    component: any;
    name: string;
    protected: boolean;
}