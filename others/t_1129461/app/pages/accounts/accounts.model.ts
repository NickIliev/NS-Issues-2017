export class AccountModel {
        public id: number;
        public name: string;
        public totalAmount: number;
        public usedAmount: number;
        public legendDetails: Object[] = new Array;
        public investedAmount: number;
        public annualContributionLimit: number;
        public showInvestedAmount: boolean;
        public contributionsYTD: number;
        public contributionsThisYear: number;
}