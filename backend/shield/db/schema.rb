# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "companies", force: :cascade do |t|
    t.string "name", limit: 45
  end

  create_table "houses", force: :cascade do |t|
    t.string  "house_number", limit: 45
    t.string  "extension",    limit: 45
    t.integer "company_id",   limit: 4
  end

  add_index "houses", ["company_id"], name: "me_company_idx", using: :btree

  create_table "residents", force: :cascade do |t|
    t.string   "name",                  limit: 45
    t.string   "first_name",            limit: 45
    t.string   "last_name",             limit: 45
    t.string   "phone_number",          limit: 45
    t.datetime "birthday"
    t.string   "picture",               limit: 45
    t.integer  "house_id",              limit: 4
    t.integer  "company_id",            limit: 4
    t.integer  "identification_number", limit: 4
  end

  add_index "residents", ["company_id"], name: "me_company_idx", using: :btree

  create_table "rol", force: :cascade do |t|
    t.string "name", limit: 45
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               limit: 255,   default: "email", null: false
    t.string   "uid",                    limit: 255,   default: "",      null: false
    t.string   "encrypted_password",     limit: 255,   default: "",      null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,     default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
    t.string   "name",                   limit: 255
    t.string   "nickname",               limit: 255
    t.string   "image",                  limit: 255
    t.string   "email",                  limit: 255
    t.text     "tokens",                 limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "permission_level",       limit: 4
    t.integer  "rol_id",                 limit: 4
    t.boolean  "enabled",                              default: true
    t.integer  "company_id",             limit: 4
  end

  add_index "users", ["company_id"], name: "users_company_idx", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["rol_id"], name: "fk_users_rol_idx", using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

  create_table "vehicules", force: :cascade do |t|
    t.string  "license_plate", limit: 45
    t.string  "brand",         limit: 45
    t.string  "color",         limit: 45
    t.integer "house_id",      limit: 4
    t.integer "company_id",    limit: 4
  end

  add_index "vehicules", ["company_id"], name: "me_company_idx", using: :btree
  add_index "vehicules", ["house_id"], name: "me_house_idx", using: :btree

  add_foreign_key "houses", "companies", name: "houses_company"
  add_foreign_key "residents", "companies", name: "residents_company"
  add_foreign_key "users", "companies", name: "users_company"
  add_foreign_key "users", "rol", name: "fk_users_rol"
  add_foreign_key "vehicules", "companies", name: "vehicules_company"
  add_foreign_key "vehicules", "houses", name: "vehicules_house"
end
