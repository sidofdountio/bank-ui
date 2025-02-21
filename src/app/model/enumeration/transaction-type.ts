export interface TransactionType {
    DEPOSIT: 'deposit';
    WITHDRAWAL: 'withdrawal';
    TRANSFER: 'transfer';
    CHARGE: 'charge';
    DISBURSE: 'disburse';
    RECEIVE: 'receive';
    TRANSFER_OUT: 'TRANSFER_OUT';
    TRANSFER_IN: 'TRANSFER_IN';
    TAX_WITHDRAWAL: 'TAX_WITHDRAWAL';
    INTEREST: 'interest';
    TRANSFER_CHARGE: 'transfer_charge';
    TRANSFER_DISBURSE: 'transfer_disburse';
    TRANSFER_RECEIVE: 'transfer_receive';
    TRANSFER_OUT_CHARGE: 'transfer_out_charge';
    TRANSFER_OUT_DISBURSE: 'transfer_out_disburse';
    TRANSFER_OUT_RECEIVE: 'transfer_out_receive';
    TRANSFER_IN_CHARGE: 'transfer_in_charge';
    TRANSFER_IN_DISBURSE: 'transfer_in_disburse';
    TRANSFER_IN_RECEIVE: 'transfer_in_receive';
}
