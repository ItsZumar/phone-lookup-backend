"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Category = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
var Category;
(function (Category) {
    Category["SCAM"] = "SCAM";
    Category["SPAM"] = "SPAM";
    Category["TELEMARKETING"] = "TELEMARKETING";
    Category["FRAUD"] = "FRAUD";
    Category["OTHER"] = "OTHER";
})(Category || (exports.Category = Category = {}));
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["APPROVED"] = "APPROVED";
    Status["REJECTED"] = "REJECTED";
})(Status || (exports.Status = Status = {}));
//# sourceMappingURL=types.js.map