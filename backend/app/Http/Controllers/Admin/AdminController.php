<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateAdminRequest;
use App\Http\Resources\TransactionListResource;
use App\Http\Resources\UserResource;
use App\Models\Transaction;
use App\Models\User;
use App\UserRole;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AdminController extends Controller
{
    public function users()
    {
        $auth_user_role = auth()->user()->role;
        if ($auth_user_role == UserRole::Admin->value) {
            $users = User::where("role", UserRole::User->value)->orderBy("created_at", "desc")->get();

        } else {
            $users = User::orderBy("created_at", "desc")->get();

        }
        return UserResource::collection($users);
    }

    public function Transactions()
    {
        if (Gate::denies('view-transactions')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }


        $transactions = Transaction::with("user")
            ->orderBy("created_at", "desc")
            ->paginate(10);


        return TransactionListResource::collection($transactions);
    }

    public function changeStatus(Request $request)
    {
        $user = User::find($request->id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->status = $user->status === 'active' ? 'inactive' : 'active';
        $user->save();

        return response()->json(['message' => 'Status updated successfully'], 200);
    }

    public function userTransactions(User $user)
    {
        return response()->json($user->userTransactions()->latest()->get());
    }

    public function createAdmin(CreateAdminRequest $request)
    {
        if (Gate::denies('create-admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $validated = $request->validated();

        $admin = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'admin',
            'wallet_balance' => 0,
            'status' => $validated["status"],
        ]);

        return new UserResource($admin);
    }


    public function stats()
    {
        return response()->json([
            'total_payments' => Transaction::where('status', 'paid')->sum('amount'),
            'active_users' => User::where('status', 'active')->count(),
            'pending_payments' => Transaction::where('status', 'pending')->sum('amount'),
            'failed_payments' => Transaction::where('status', 'failed')->sum('amount'),
            'total_transactions' => Transaction::count(),
        ]);
    }

}
