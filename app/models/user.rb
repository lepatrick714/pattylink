class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  def self.from_google_payload(payload)
    where(email: payload['email']).first_or_create { |user|
      user.email = payload['email']
      user.password = Devise.friendly_token[0, 20] if user.password.blank?
    }
  end
end
