class User < ApplicationRecord
    enum status: { PENDING: 0, VERIFIED: 1, APPROVED: 2 }
    has_many :transactions

    after_initialize :set_default_status, if: :new_record?

    def set_default_status
        self.status ||= :PENDING
    end
    
    def admin_approve!
        update(status: :VERIFIED)
    end
    
    def finance_approve!
        update(status: :APPROVED)
    end


    # validations
    validates :username, presence: true
    validates :email, presence: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } 
    validates :password, presence: true, length: { minimum: 6 }
    validates :status, presence: true
end
