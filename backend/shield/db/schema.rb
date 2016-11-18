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

  create_table "access_doors", force: :cascade do |t|
    t.string  "name",       limit: 45
    t.integer "company_id", limit: 4
  end

  add_index "access_doors", ["company_id"], name: "company_door_idx", using: :btree

  create_table "companies", force: :cascade do |t|
    t.string "name", limit: 45
  end

  create_table "company_configurations", force: :cascade do |t|
    t.integer "quantity_houses",      limit: 4, default: 0
    t.integer "quantity_admins",      limit: 4, default: 0
    t.integer "quantity_access_door", limit: 4, default: 0
    t.integer "company_id",           limit: 4
  end

  add_index "company_configurations", ["company_id"], name: "company_configuration_idx", using: :btree

  create_table "emergencies", force: :cascade do |t|
    t.string  "observation", limit: 300
    t.integer "isAttended",  limit: 4
    t.integer "house_id",    limit: 4
    t.integer "company_id",  limit: 4,   null: false
  end

  create_table "houses", force: :cascade do |t|
    t.string   "house_number",              limit: 45
    t.string   "extension",                 limit: 45
    t.integer  "company_id",                limit: 4
    t.integer  "is_desocupated",            limit: 1,  default: 0
    t.datetime "desocupation_initial_time"
    t.string   "securityKey",               limit: 20
    t.string   "emergencyKey",              limit: 20
  end

  add_index "houses", ["company_id"], name: "me_company_idx", using: :btree

  create_table "notes", force: :cascade do |t|
    t.string   "description",   limit: 1000
    t.integer  "company_id",    limit: 4
    t.integer  "house_id",      limit: 4
    t.string   "note_type",     limit: 45
    t.datetime "creation_date"
  end

  add_index "notes", ["company_id"], name: "company_note_idx", using: :btree
  add_index "notes", ["house_id"], name: "house_note_idx", using: :btree

  create_table "officers", force: :cascade do |t|
    t.string  "name",                  limit: 45
    t.string  "last_name",             limit: 45
    t.string  "second_last_name",      limit: 45
    t.string  "identification_number", limit: 45
    t.integer "company_id",            limit: 4
    t.integer "in_service",            limit: 1,  default: 0
  end

  add_index "officers", ["company_id"], name: "officers_company_idx", using: :btree

  create_table "officers_watches", force: :cascade do |t|
    t.integer "watch_id",   limit: 4
    t.integer "officer_id", limit: 4
  end

  add_index "officers_watches", ["officer_id"], name: "ok_officer_idx", using: :btree
  add_index "officers_watches", ["watch_id"], name: "pk_watch_idx", using: :btree

  create_table "residents", force: :cascade do |t|
    t.string  "name",                  limit: 45
    t.string  "last_name",             limit: 45
    t.string  "second_last_name",      limit: 45
    t.string  "phone_number",          limit: 45
    t.date    "birthday"
    t.string  "picture",               limit: 45
    t.integer "house_id",              limit: 4
    t.integer "company_id",            limit: 4
    t.integer "identification_number", limit: 4
    t.string  "email",                 limit: 45
    t.integer "is_owner",              limit: 1,  default: 0
    t.integer "user_id",               limit: 4
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
    t.string   "last_name",              limit: 255
    t.string   "second_last_name",       limit: 255
    t.integer  "identification_number",  limit: 4
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
    t.integer  "resident_id",            limit: 4
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

  create_table "visitants", force: :cascade do |t|
    t.string   "name",                     limit: 45
    t.string   "last_name",                limit: 45
    t.string   "second_last_name",         limit: 45
    t.string   "identification_number",    limit: 45
    t.string   "license_plate",            limit: 45
    t.datetime "date_time"
    t.integer  "id_house",                 limit: 4
    t.integer  "company_id",               limit: 4
    t.datetime "invitation_starting_time"
    t.datetime "invitation_limit_time"
    t.integer  "is_invited",               limit: 4,  default: 0
  end

  add_index "visitants", ["company_id"], name: "company_visitants_idx", using: :btree
  add_index "visitants", ["id_house"], name: "house_visitants_idx", using: :btree

  create_table "watches", force: :cascade do |t|
    t.datetime "initial_time"
    t.datetime "final_time"
    t.integer  "company_id",     limit: 4
    t.integer  "access_door_id", limit: 4
  end

  add_index "watches", ["access_door_id"], name: "watch_access_idx", using: :btree
  add_index "watches", ["company_id"], name: "watch_company_idx", using: :btree

  add_foreign_key "access_doors", "companies", name: "company_door"
  add_foreign_key "company_configurations", "companies", name: "company_configuration"
  add_foreign_key "houses", "companies", name: "houses_company"
  add_foreign_key "notes", "companies", name: "company_note"
  add_foreign_key "notes", "houses", name: "house_note"
  add_foreign_key "officers", "companies", name: "officers_company"
  add_foreign_key "officers_watches", "officers", name: "pk_officer"
  add_foreign_key "officers_watches", "watches", name: "pk_watch"
  add_foreign_key "residents", "companies", name: "residents_company"
  add_foreign_key "users", "companies", name: "users_company"
  add_foreign_key "users", "rol", name: "fk_users_rol"
  add_foreign_key "vehicules", "companies", name: "vehicules_company"
  add_foreign_key "vehicules", "houses", name: "vehicules_house"
  add_foreign_key "visitants", "companies", name: "company_visitants"
  add_foreign_key "visitants", "houses", column: "id_house", name: "house_visitants"
  add_foreign_key "watches", "access_doors", name: "watch_access"
  add_foreign_key "watches", "companies", name: "watch_company"
end
