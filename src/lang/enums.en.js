export default {
  CustodianType: {
    "self-managed": "Self-managed",
    "joint-managed": "Co-managed",
    "platform-managed": "Escrow",
  },
  RoleType: {
    admin: "Admin",
    approver: "Approver",
    "co-signer": "Co-signer",
    manager: "Manager",
  },
  AccountStatusType: {
    normal: "Normal",
    "pending-for-activation": "Pending For Activation",
    "pending-for-verification": "Pending For Verification",
    "pending-for-upload-documents": "Pending For Upload Documents",
    "pending-for-initial-review": "Pending For Initial Review",
    "pending-for-final-review": "Pending For Final Review",
    "pending-for-review": "Pending For Review",
    "review-not-passed": "Review Not Passed",
  },
  CustomerStatusType: {
    normal: "Normal",
    uncompleted: "Uncompleted",
    "pending-first-review": "Pending First Review",
    "pending-rco-review": "Pending Rco Review",
    "review-failed": "Review Failed",
  },
  AlgorithmType: {
    "multi-sig": "Multi-sig",
    threshold: "Threshold",
  },
  TransactionType: {
    withdraw: "Withdraw",
    deposit: "Deposit",
  },
  TransactionStatusType: {
    succeed: "Succeed",
    failed: "Failed",
    rejected: "Rejected",
    "pending-for-approval": "Pending For Approval",
    "pending-for-sign": "Pending For Sign",
    "in-process": "In Process",
    "blockchain-confirming": "Blockchain Confirming",
  },
  ActivityType: {
    "withdraw-operate": "Withdraw Operation",
    "withdraw-review": "Withdraw Review",
    "create-address": "Create Address",
    "account-review": "Account Review",
  },
  WorkflowStatusType: {
    succeed: "Succeed",
    failed: "Failed",
    rejected: "Rejected",
    "pending-for-approval": "Pending For Approval",
    "pending-for-sign-params": "Pending For Sign Params",
    "pending-for-sign": "Pending For Sign",
    "in-process": "In Process",
    "blockchain-confirming": "Blockchain Confirming",
  },
  PublicKeyStatusType: {
    unused: "Unused",
    used: "Used",
  },
  AnnouncementStatusType: {
    sent: "Sent",
    pending: "Pending",
  },
};
